function generateRandomString(length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const SpotifyData = {
  response_type: 'code',
  clientId: '0aae5c97723143efb114af6f89263605',
  clientSecret: '14a06525bca14592958c3f03ffb4fb8a',
  scope: 'user-read-private user-read-email user-follow-read',
  redirect_uri: 'https://spotifyact.netlify.app/callback',
  state: generateRandomString(16),
};
