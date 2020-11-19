function generateRandomString(length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/*export const SpotifyData = {
  response_type: 'code',
  clientId: 'cb12ac185b5a48358cb1425f2b62ee18',
  clientSecret: '2bff4f9f0dee49c5a576fa61777ad5cd',
  scope: 'user-read-private user-read-email user-follow-read user-modify-playback-state',
  redirect_uri: 'http://localhost:3000/callback',
  state: generateRandomString(16),
};*/

export const SpotifyData = {
  response_type: 'code',
  clientId: '0aae5c97723143efb114af6f89263605',
  clientSecret: '14a06525bca14592958c3f03ffb4fb8a',
  scope: 'user-read-private user-read-email user-follow-read user-modify-playback-state',
  redirect_uri: 'https://spotifyact.netlify.app/callback',
  state: generateRandomString(16),
};
