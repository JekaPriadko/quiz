import mongoose from 'mongoose';
import setupUserRoleBd from '../../utils/setupUserRoleBd';
import logger from '../../utils/logger';

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST = '127.0.0.1',
  MONGODB_PORT,
  MONGODB_NAME,
} = process.env;

const connectURI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`;

const db = mongoose.connect(connectURI).then(async () => {
  console.log('---Database is connected !!---');
  await setupUserRoleBd();
});

db.catch(err => {
  if (err.message.code === 'ETIMEDOUT') {
    logger.error(
      `DB Error: cannot connect to db with error ${err.message.code}`,
    );

    mongoose.connect(connectURI);
  }
  logger.error('DB Error: cannot connect to db');
});

export default db;
