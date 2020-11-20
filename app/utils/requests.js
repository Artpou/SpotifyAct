import axios from 'axios';

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
      // console.log(res);
    })
    .catch(error => {});
}
