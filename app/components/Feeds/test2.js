import axios from 'axios';

function getAlbums(artists, type) {
  return new Promise(resolve => {
    const list = [];
    let loaded = 0;
    console.log(`${type} LOAD ALL`);
    artists.forEach(function iterate(artist) {
      const url = `https://api.spotify.com/v1/artists/${
        artist.id
      }/albums?include_groups=${type}&market=FR&limit=3`;
      // console.log(url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(res => {
          console.log(res);
          res.data.items.forEach(album => {
            if (new Date(album.release_date) > new Date('2020-11')) {
              if (!list.some(a => a.id === album.id)) {
                list.push(album);
              }
            }
          });
        })
        .catch(error => {
          // console.log(`${type} ERROR ${index} : ${loaded}`);
          console.error(error);
          // setLoading(false);
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
            resolve(list);
          }
        });
    });
  });
}

export default async function dop(artists, type = 'album') {
  return await getAlbums(artists, type);
}
