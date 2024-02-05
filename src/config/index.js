import { devEnv, prodEnv, testEnv } from './env/index';

const { CLOCKING_SYSTEM_NODE_ENV } = process.env;

const config = CLOCKING_SYSTEM_NODE_ENV === 'development' ? devEnv
  : CLOCKING_SYSTEM_NODE_ENV === 'production' ? prodEnv
    : testEnv;

export default config;
