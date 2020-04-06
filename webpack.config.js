const path = require('path');

module.exports = {
  entry: './server/server.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { configFile: 'tsconfig-server.json' },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.tsx', '.ts', '.js', '.d.ts'],
    mainFields: ['main', 'module', 'browser'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
};
