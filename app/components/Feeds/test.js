import { LocalDining } from '@material-ui/icons';
import axios from 'axios';

export default function getArtistsRequest(
  artists,
  loading,
  next = '',
  tmp = [],
) {
  const nextPath = next !== '' ? `&after=${next}` : '';
  const url = `https://api.spotify.com/v1/me/following?type=artist${nextPath}&limit=50`;
  const loaded = false;
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
      // tmp = [...tmp, ...res.data.artists.items];
      if (res.data.artists.cursors.after) {
        getArtistsRequest(res.data.artists.cursors.after, tmp);
      } else {
        artists([...tmp, ...res.data.artists.items]);
        loading(false);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

async function dop() {
  await getArtistsRequest();
}
