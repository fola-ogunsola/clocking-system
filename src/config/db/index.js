import pgp from 'pg-promise';
import promise from 'bluebird';
import config from '../index';

// Initialize postgres database
const pg = pgp({ promiseLib: promise, noWarnings: true });
const db = pg(config.CLOCKING_SYSTEM_DATABASE_URL);

export { db };
