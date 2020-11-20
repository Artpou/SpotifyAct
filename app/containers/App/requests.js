import React from 'react';
import axios from 'axios';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getArtists(set, next = '', loaded = []) {
  set(prevState => ({
    ...prevState,
    loadingProgress: 'artists',
    loading: true,
  }));

  const nextPath = next !== '' ? `&after=${next}` : '';
  const url = `https://api.spotify.com/v1/me/following?type=artist${nextPath}&limit=50`;
  const artists = loaded;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export function getAlbums(artists, set) {
  set(prevState => ({
    ...prevState,
    loadingProgress: 'albums',
    loading: true,
  }));

  const list = [];
  let loaded = 0;
  const errors = [];

  // console.log(`${type} LOAD ALL`);
  artists.forEach(function iterate(artist) {
    const url = `https://api.spotify.com/v1/artists/${
      artist.id
    }/albums?offset=0&limit=3&include_groups=album&market=FR`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        res.data.items.forEach(album => {
          if (new Date(album.release_date) > new Date('2020-11')) {
            if (!list.some(a => a.id === album.id)) {
              list.push(album);
            }
          }
        });
      })
      .catch(error => {
        // console.log(errors);
        errors.push(artist);
      })
      .finally(() => {
        loaded++;
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
            console.log(errors);
            console.log('RELOAD ERRORS');
            set(prevState => ({
              ...prevState,
              loadingProgress: (
                <span>
                  chargement des albums
                  <br />
                  la première initialisation peut prendre jusqu&apos;à 30
                  secondes
                </span>
              ),
            }));
            timeout(2500).then(() => {
              console.log('reload');
             // getAlbums(errors, set, type);
            });
          } else {
            console.log(list);
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

export function getSingles(artists, set) {
  set(prevState => ({
    ...prevState,
    loadingProgress: 'albums',
    loading: true,
  }));

  const list = [];
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        res.data.items.forEach(album => {
          if (new Date(album.release_date) > new Date('2020-11')) {
            if (!list.some(a => a.id === album.id)) {
              list.push(album);
            }
          }
        });
      })
      .catch(error => {
        // console.log(errors);
        errors.push(artist);
      })
      .finally(() => {
        loaded++;
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
            console.log(errors);
            console.log('RELOAD ERRORS');
            set(prevState => ({
              ...prevState,
              loadingProgress: (
                <span>
                  chargement des singles
                  <br />
                  la première initialisation peut prendre jusqu&apos;à 30
                  secondes
                </span>
              ),
            }));
            timeout(2500).then(() => {
              console.log('reload');
             // getAlbums(errors, set, type);
            });
          } else {
            console.log(list);
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
