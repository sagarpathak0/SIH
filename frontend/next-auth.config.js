// next-auth.config.js
module.exports = {
    // ...
    session: {
      strategy: 'cookie',
      cookie: {
        name: 'auth',
        secure: true,
        sameSite: 'lax',
        maxAge: 31536000,
      },
    },
  };