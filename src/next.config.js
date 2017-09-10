
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
  // webpack: (config, { dev }) => {
  //   // Perform customizations to webpack config
  //   if (!dev) {
  //     config.module.rules.push({
  //       test: /\.(css|ico|gif)$/,
  //       use: [
  //         {
  //           loader: 'file-loader',
  //           options: {
  //             outputPath: 'static/',
  //           },
  //         },
  //       ],
  //     });
  //   }

  //   // Important: return the modified config
  //   return config;
  // },
};
