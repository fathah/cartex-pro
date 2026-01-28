module.exports = {
  apps: [
    {
      name: 'blueoud-cartex',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: process.env.DATABASE_URL,
        PORT: 3137
      },
    },
  ],
};
