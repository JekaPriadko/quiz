import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  preflightContinue: true,
  exposedHeaders: ['WWW-Authenticate'],
};

export default corsOptions;
