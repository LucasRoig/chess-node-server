import config from './config';

let env = process.env.NODE_ENV || 'development';

export default config[env];