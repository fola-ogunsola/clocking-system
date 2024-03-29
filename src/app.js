import express from 'express';
import 'dotenv/config';
import config from './config/index';
import enums from './lib/enums/index';
import expressConfig from './config/express/index';

const port = config.CLOCKING_SYSTEM_PORT || 9089;
const app = express();
expressConfig(app);


app.listen(port);
logger.info(`${enums.CURRENT_TIME_STAMP} Application started on port ${port}`);

export default app;
