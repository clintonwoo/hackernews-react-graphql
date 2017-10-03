const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  exportPathMap: function exportPathMap() {
    return {
      '/': { page: '/' },
      '/news': { page: '/' },
      '/active': { page: '/active' },
      '/ask': { page: '/ask' },
      '/best': { page: '/best' },
      '/bestcomments': { page: '/bestcomments' },
      '/bookmarklet': { page: '/bookmarklet' },
      '/dmca': { page: '/dmca' },
      '/formatdoc': { page: '/formatdoc' },
      '/front': { page: '/front' },
      '/item': { page: '/item' },
      '/jobs': { page: '/jobs' },
      '/leaders': { page: '/leaders' },
      '/lists': { page: '/lists' },
      '/login': { page: '/login' },
      '/newcomments': { page: '/newcomments' },
      '/newest': { page: '/newest' },
      '/newpoll': { page: '/newpoll' },
      '/newsfaq': { page: '/newsfaq' },
      '/newsguidelines': { page: '/newsguidelines' },
      '/newswelcome': { page: '/newswelcome' },
      '/noobcomments': { page: '/noobcomments' },
      '/security': { page: '/security' },
      '/show': { page: '/show' },
      '/submit': { page: '/submit' },
      '/threads': { page: '/threads' },

      //     '/p/975': { page: '/post', query: { id: '975' } },
      //     '/p/481': { page: '/post', query: { id: '481' } },
    };
  },
  webpack: (config, { dev }) => {
    if (dev) {
      return config;
    }

    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        minify: true,
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    );

    return config;
  }
};
