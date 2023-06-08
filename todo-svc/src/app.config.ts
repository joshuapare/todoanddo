export default () => ({
  mongo: {
    host: process.env.MONGO_HOST || 'mongo',
    port: parseInt(process.env.MONGO_PORT) || 27017,
    user: process.env.MONGO_USER || 'root',
    pass: process.env.MONGO_PASS || 'password',
    db: process.env.MONGO_DB || 'todo',
  },
  cache: {
    host: process.env.CACHE_HOST || 'redis',
    port: parseInt(process.env.CACHE_PORT, 10) || 6379,
    // user: process.env.CACHE_USER,
    // pass: process.env.CACHE_PASS,
    db: {
      TODO: 0,
    },
  },
});
