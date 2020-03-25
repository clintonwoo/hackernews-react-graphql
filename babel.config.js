// Next.JS expects babel.config.js in app root, we want /pages in /src folder so we have it here
module.exports = (api) => {
  api.cache(false);

  return {
    presets: ['next/babel'],
    plugins: [],
  };
};
