import axios from 'axios';

export async function putPlayMusic(uri, set) {
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
