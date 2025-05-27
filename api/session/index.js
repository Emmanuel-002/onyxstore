import session from 'express-session';
// import RedisStore from 'connect-redis';
// import memoryStore from 'memorystore';
// import redisClient from '../cache/index.js';

// const MemoryStore = memoryStore(session);

export default (app) =>
  session({
    // store: app.get('env') === 'production' ? new RedisStore({ client: redisClient }) : new MemoryStore({ checkPeriod: 18000000 }),
    name: 'sessId',
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false, // To ensure that the session is not saved if the session is not modified
    cookie: {
      secure: app.get('env') === 'production' ? true : false,
      httpOnly: true,
      maxAge: 18000000, // 5 hours
    },
  });
