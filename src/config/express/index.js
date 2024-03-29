import helmet from 'helmet';
import 'dotenv/config';
import { json, urlencoded } from 'express';
import compression from 'compression';
import cors from 'cors';
import formData from 'express-form-data';
import loggerInit from '../logger/index';
import enums from '../../lib/enums/index';
import ApiResponse from '../../lib/http/lib.http.responses';
import routes from '../routes/index';
import config from '../index';

const expressConfig = app => {
  let logger;

  switch (app.get('env')) {
  case 'development':
    logger = loggerInit('development');
    break;

  case 'production':
    logger = loggerInit('production');
    break;

  case 'test':
    logger = loggerInit('test');
    break;

  default:
    logger = loggerInit();
  }

  global.logger = logger;
  logger.info(`${enums.CURRENT_TIME_STAMP} Application starting...`);
  logger.debug('Overriding \'Express\' logger');
  logger.info(`${enums.CURRENT_TIME_STAMP} Environment is ${process.env.CLOCKING_SYSTEM_NODE_ENV}`);

  // app.use(fileUpload());
  // app.use(formData.parse())
  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: 10000000 })); // set to allow 10mb JSON size
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  

  // allow certain domains and allow certain HTTP methods
  app.use((req, res, next) => {
    const allowedOrigins = config.CLOCKING_SYSTEM_ALLOWABLE_ORIGINS?.split(',').join('').split(' ');
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.disable('x-powered-by');

  // Welcome route
  app.get('/', (_req, res) => {
    return ApiResponse.success(res, enums.WELCOME, enums.HTTP_OK);
  });
  // Other routes
  routes(app);

  // error handlers

  // catch 404 and forward to error handler
  app.use((_req, res) => res.status(enums.HTTP_NOT_FOUND).json({
    status: enums.ERROR_STATUS,
    code: enums.HTTP_NOT_FOUND,
    message: enums.DEAD_END_MESSAGE
  }));

  // catch server related errors and forward to error handler
  app.use((err, _req, res) => {
    res.status(enums.HTTP_INTERNAL_SERVER_ERROR).json({
      status: err.status || enums.ERROR_STATUS,
      message: err.message || enums.SOMETHING_BROKE_MESSAGE
    });
  });
};

export default expressConfig;
