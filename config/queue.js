const Queue = require('bull');

const downloadFileQueue = new Queue('download_file', { redis: { port: process.env.REDIS_PORT, host: process.env.localhost} });


module.exports = downloadFileQueue;