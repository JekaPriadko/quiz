import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from './swagger';
import corsConfig from './config/cors/cors.config';
import routes from './routes';
import {
  appErrorHandler,
  lostErrorHandler,
} from './exceptions/exceptionsHandler';

/*
  1. INITIALIZE EXPRESS APPLICATION
*/
const app: Express = express();

/*
  2. APPLICATION SWAGGER
*/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/*
  3. APPLICATION MIDDLEWARES AND CUSTOMIZATIONS
*/
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));

/*
  4. APPLICATION ROUTES
*/
app.use('/api/v1', routes);

/* eslint-disable */
app.post('/test', function (req, res) {
  res.status(201).send({
    test: 'test',
  });
});
/* eslint-enable */

/*
  5. APPLICATION ERROR HANDLING
*/
app.use(lostErrorHandler); // 404 error handler middleware
app.use(appErrorHandler); // General app error handler

export default app;
