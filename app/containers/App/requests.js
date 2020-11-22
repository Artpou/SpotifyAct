import axios from 'axios';
import { useNotificationState } from './NotificationContext';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function reloadToken(set) {
  // console.log(sessionStorage.getItem('token'));
  // document.location.replace(`/?code=${sessionStorage.getItem('refresh_token')}`);
  set(prevState => ({
    ...prevState,
    loadingProgress: 'error',
    loading: false,
  }));
}

export function getUser(set) {
  set(prevState => ({
    ...prevState,
    loading: true,
  }));

  const url = `https://api.spotify.com/v1/me`;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then(res => {
      // console.log(res);
      set(prevState => ({
        ...prevState,
        user: res.data,
        loadingProgress: 'artists',
        loading: false,
      }));
    })
    .catch(() => {
      reloadToken(set);
    });
}

export function getArtists(set, next = '', loaded = []) {
  set(prevState => ({
    ...prevState,
    loadingProgress: 'artists',
    loading: true,
  }));

  // console.log(nextPath);
  const nextPath = next !== '' ? `&after=${next}` : '';
  const url = `https://api.spotify.com/v1/me/following?type=artist${nextPath}&limit=50`;
  const artists = loaded;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then(res => {
      res.data.artists.items.forEach(element => {
        artists.push(element);
      });
      // console.log(res);
      if (res.data.artists.cursors.after) {
        getArtists(set, res.data.artists.cursors.after, loaded);
      } else {
        set(prevState => ({
          ...prevState,
          artists,
          loadingProgress: 'albums',
          loading: false,
        }));
      }
    })
    .catch(error => {
      console.error(error);
    });
}

export function getAlbums(artists, set, setNotification, loadedAlbums = []) {
  set(prevState => ({
    ...prevState,
    loadingProgress: 'albums',
    loading: true,
  }));

  const list = loadedAlbums;
  let loaded = 0;
  const errors = [];

  artists.forEach(function iterate(artist) {
    const url = `https://api.spotify.com/v1/artists/${
      artist.id
    }/albums?offset=0&limit=3&include_groups=album&market=FR`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(res => {
        res.data.items.forEach(album => {
          if (
            new Date(album.release_date) >
            new Date().setMonth(new Date().getMonth() - 1)
          ) {
            if (!list.some(a => a.id === album.id)) {
              list.push(album);
            }
          }
        });
      })
      .catch(() => {
        // console.log(errors);
        errors.push(artist);
      })
      .finally(() => {
        loaded += 1;
        // for the last request
        if (loaded === artists.length - 1) {
          list.sort((o1, o2) => {
            if (new Date(o1.release_date) < new Date(o2.release_date)) {
              return 1;
            }
            if (new Date(o1.release_date) > new Date(o2.release_date)) {
              return -1;
            }
            return 0;
          });
          if (errors.length > 0) {
            timeout(2500).then(() => {
              console.log('reload');
              setNotification({type: 'reload', text: 'rechargement des nouveaux albums ...'})
              getAlbums(errors, set, setNotification, list);
            });
          } else {
            // console.log(list);
            set(prevState => ({
              ...prevState,
              albums: list,
              loadingProgress: 'single',
              loading: false,
            }));
          }
        }
      });
  });
}

export function getSingles(artists, set, setNotification, loadSingle = []) {
  set(prevState => ({
    ...prevState,
    loadingProgress: 'albums',
    loading: true,
  }));

  const list = loadSingle;
  let loaded = 0;
  const errors = [];

  // console.log(`${type} LOAD ALL`);
  artists.forEach(function iterate(artist) {
    const url = `https://api.spotify.com/v1/artists/${
      artist.id
    }/albums?offset=0&limit=3&include_groups=single&market=FR`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(res => {
        res.data.items.forEach(album => {
          if (
            new Date(album.release_date) >
            new Date().setMonth(new Date().getMonth() - 1)
          ) {
            if (!list.some(a => a.id === album.id)) {
              list.push(album);
            }
          }
        });
      })
      .catch(() => {
        // console.log(errors);
        errors.push(artist);
      })
      .finally(() => {
        loaded += 1;
        // console.log(loaded+'   '+artists.length);
        // for the last request
        if (loaded === artists.length - 1) {
          list.sort((o1, o2) => {
            if (new Date(o1.release_date) < new Date(o2.release_date)) {
              return 1;
            }
            if (new Date(o1.release_date) > new Date(o2.release_date)) {
              return -1;
            }
            return 0;
          });
          if (errors.length > 0) {
            timeout(2500).then(() => {
              console.log('reload');
              setNotification({type: 'reload', text: 'rechargement des nouveaux singles ...'})
              getAlbums(errors, set, setNotification, list);
            });
          } else {
            // console.log(list);
            set(prevState => ({
              ...prevState,
              singles: list,
              loadingProgress: 'finish',
              loading: false,
            }));
          }
        }
      });
  });
}
