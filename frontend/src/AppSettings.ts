export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://myqanda-backend.azurewebsites.net'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'https://qandastaging.azurewebsites.net'
    : 'https://localhost:44350';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'mnguzd.us.auth0.com',
  client_id: 'KRH7eVtSU1kU881fJ9O1hr79oPGghgYS',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
