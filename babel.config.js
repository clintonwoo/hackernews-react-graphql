// Next.JS expects babel.config.js in app root, we want /pages in /src folder so we have it here
module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['next/babel'],
    plugins: [
      // '@babel/plugin-syntax-dynamic-import',
      // '@babel/plugin-proposal-export-default-from',
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      [
        'transform-define',
        {
          'process.env.NODE_ENV': process.env.NODE_ENV,
        },
      ],
    ],
  };
};
