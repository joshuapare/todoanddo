export default () => ({
  db: {
    host: process.env.DB_HOST || 'mysql',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || 'password',
    db: process.env.DB_DB || 'users',
  },
  cache: {
    host: process.env.CACHE_HOST || 'redis',
    port: parseInt(process.env.CACHE_PORT, 10) || 6379,
    db: 1,
  },
});
