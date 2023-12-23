const ACCESS_TOKEN = {
  secret: process.env.AUTH_ACCESS_TOKEN_SECRET as string,
  jwtExpiration: process.env.AUTH_ACCESS_TOKEN_EXPIRY as string,
};

const REFRESH_TOKEN = {
  secret: process.env.AUTH_REFRESH_TOKEN_SECRET as string,
  jwtExpiration: process.env.AUTH_REFRESH_TOKEN_EXPIRY as string,
};

const COOKIE = {
  name: 'refreshTkn',
  options: {
    sameSite: 'None',
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
};

export { ACCESS_TOKEN, REFRESH_TOKEN, COOKIE };
