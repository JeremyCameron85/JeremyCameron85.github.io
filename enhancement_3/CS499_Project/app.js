import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { initServices } from './src/services/init-services.js';

import indexRouter from './src/routes/index.js';
import contactRoutes from './src/routes/contact.js';
import taskRoutes from './src/routes/task.js';
import appointmentRoutes from './src/routes/appointment.js';
import errorHandler from './src/middleware/error-handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createApp() {
  const app = express();
  const services = await initServices();
  app.locals.services = services;
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use((req, res, next) => {
    req.services = services;
    next();
  });
  app.use('/', indexRouter);
  app.use('/contacts', contactRoutes);
  app.use('/tasks', taskRoutes);
  app.use('/appointments', appointmentRoutes);
  app.use(function (req, res, next) {
    next(createError(404));
  });
  app.use(errorHandler);
  return app;
}

export default createApp;