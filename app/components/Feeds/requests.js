import axios from 'axios';

export function getArtists(setArtists, setLoading, next = '', loaded = []) {
  const nextPath = next !== '' ? `&after=${next}` : '';
  const url = `https://api.spotify.com/v1/me/following?type=artist${nextPath}&limit=50`;
  const setLoaded = loaded;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(res => {
      res.data.artists.items.forEach(element => {
        setLoaded.push(element);
      });
      console.log(res);
      if (res.data.artists.cursors.after) {
        getArtists(
          setArtists,
          setLoading,
          res.data.artists.cursors.after,
          loaded,
        );
      } else {
        console.log(setLoaded);
        setArtists(setLoaded);
        setLoading(false);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

export function getAlbums(
  artists,
  setList,
  setLoading,
  type = 'album',
  unloaded = artists,
) {
  const list = [];
  let loaded = 0;
  const errors = [];
  console.log(`${type} LOAD ALL`);
  artists.forEach(function iterate(artist, index) {
    const url = `https://api.spotify.com/v1/artists/${
      artist.id
    }/albums?offset=0&limit=3&include_groups=${type}&market=FR`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        // console.log(res);
        res.data.items.forEach(album => {
          if (new Date(album.release_date) > new Date('2020-11')) {
            if (!list.some(a => a.id === album.id)) {
              list.push(album);
            }
          }
        });
      })
      .catch(error => {
        errors.push(artist);
        // console.log(errors);
        // console.log(`${type} ERROR ${index} : ${loaded}`);
        // setLoading(false);
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
            setLoadingProgress(
              `${loadingProgress} la première initialisation peut prendre jusqu'à 30 secondes`,
            );
            timeout(2500).then(() => {
              getAlbums(setList, setLoading, type, errors);
            });
          } else {
            setLoading(false);
            console.log('END LOAD');
            console.log(list);
            setList(list);
          }
        }
      });
  });
}

export function putPlayMusic(uri) {
  const url = `https://api.spotify.com/v1/me/player/play`;
  axios
    .put(
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then(res => {
      console.log(res);
    })
    .catch(error => {});
}
