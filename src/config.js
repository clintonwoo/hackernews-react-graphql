export const dev = process.env.NODE_ENV !== 'production';
export const appPath = process.env.NODE_ENV === 'production' ? '' : './src';
export const dbURI = '';
export const HOST_NAME = 'https://localhost';
export const APP_PORT = 3000;
export const appURI = `${HOST_NAME}:${APP_PORT}`;
