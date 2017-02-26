

const isDev = process.env.NODE_ENV !== "production"
export default (isDev ? require('./development') : require('./production'));
