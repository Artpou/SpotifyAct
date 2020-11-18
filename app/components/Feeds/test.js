import axios from 'axios';

function getArtistsRequest(next = '', tmp = []) {
  return new Promise(resolve => {
    const nextPath = next !== '' ? `&after=${next}` : '';
    const url = `https://api.spotify.com/v1/me/following?type=artist${nextPath}&limit=50`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        // setArtists([...artists, ...['res.data.artists.items']]);
        // setArtists(Array.prototype.push.apply(artists, res.data.artists.items));
        // setArtists(artists.push(Object.values(res.data.artists.items)));
        tmp = [...tmp, ...res.data.artists.items];
        if (res.data.artists.cursors.after) {
          resolve(getArtistsRequest(res.data.artists.cursors.after, tmp));
        }
        resolve(tmp);
      })
      .catch(error => {
        console.error('ARTIST ERRORS');
      });
  })
}

export default async function dop() {
  return await getArtistsRequest();
}
