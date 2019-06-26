export enum KnownConfigKey {
  jwtSecret = 'jwt-sign-mysecrettoken',
}

function get(key: string): string {
  // TODO: implement properly
  return 'mySecretToken';
}

export default {
  get,
};
