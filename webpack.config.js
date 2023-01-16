const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.ts',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
