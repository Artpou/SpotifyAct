import axios from 'axios';

/**
 * Timeout for x ms
 * @param {*} ms
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * TODO
 * @param {*}
 */
export async function reloadToken(set) {
  // console.log(sessionStorage.getItem('token'));
  // document.location.replace(`/?code=${sessionStorage.getItem('refresh_token')}`);
  set(prevState => ({
    ...prevState,
    loadingProgress: 'error',
    loading: false,
  }));
}

/**
 * Get current user
 */
export async function getUser() {
  const url = `https://api.spotify.com/v1/me`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
}

/**
 * Get followed Artists
 * @param {*} next
 * @param {*} loaded
 */
export function getArtists(next = '', loaded = []) {
  return new Promise((resolve, reject) => {
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
        if (res.data.artists.cursors.after) {
          getArtists(res.data.artists.cursors.after, artists).then(load => {
            resolve(load);
          });
        } else {
          resolve(artists);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
}

/**
 * Get recents albums from followed artists
 * @param {*} artists
 * @param {*} callback
 */
export function getAlbums(artists, setNotification, callback = []) {
  const list = callback;
  const errors = [];
  let loaded = 0;

  return new Promise((resolve, reject) => {
    if (artists.length === 0) {
      resolve([]);
    }
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
          errors.push(artist);
        })
        .finally(() => {
          loaded += 1;
          // for the last request
          if (loaded === artists.length) {
            if (errors.length > 0) {
              timeout(4500).then(() => {
                setNotification({
                  type: 'reload',
                  text: 'rechargement des singles ...',
                });
                getAlbums(errors, setNotification, list).then(res => {
                  resolve(res);
                });
              });
            } else {
              list.sort((o1, o2) => {
                if (new Date(o1.release_date) < new Date(o2.release_date)) {
                  return 1;
                }
                if (new Date(o1.release_date) > new Date(o2.release_date)) {
                  return -1;
                }
                return 0;
              });
              // console.log(list);
              resolve(list);
            }
          }
        });
    });
  });
}

/**
 * Get new singles from followed artists
 * @param {*} artists
 * @param {*} callback
 */
export function getSingles(artists, setNotification, callback = []) {
  const list = callback;
  const errors = [];
  let loaded = 0;

  return new Promise((resolve, reject) => {
    if (artists.length === 0) {
      resolve([]);
    }
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
          res.data.items.forEach(single => {
            if (
              new Date(single.release_date) >
              new Date().setMonth(new Date().getMonth() - 1)
            ) {
              if (!list.some(a => a.id === single.id)) {
                list.push(single);
              }
            }
          });
        })
        .catch(() => {
          errors.push(artist);
        })
        .finally(() => {
          loaded += 1;
          // for the last request
          if (loaded === artists.length) {
            if (errors.length > 0) {
              timeout(4500).then(() => {
                setNotification({
                  type: 'reload',
                  text: 'rechargement des singles ...',
                });
                getSingles(errors, setNotification, list).then(res => {
                  resolve(res);
                });
              });
            } else {
              list.sort((o1, o2) => {
                if (new Date(o1.release_date) < new Date(o2.release_date)) {
                  return 1;
                }
                if (new Date(o1.release_date) > new Date(o2.release_date)) {
                  return -1;
                }
                return 0;
              });
              // console.log(list);
              resolve(list);
            }
          }
        });
    });
  });
}

/**
 * Play music from single or album
 * @param {*} uri
 */
export async function putPlayMusic(uri) {
  const url = `https://api.spotify.com/v1/me/player/play`;
  axios.put(
    url,
    {
      context_uri: uri,
      offset: {
        position: 0,
      },
      position_ms: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    },
  );
}
