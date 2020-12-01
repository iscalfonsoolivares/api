const path = require('path');

module.exports = {
    mode: "production",
    entry: "./client/typescript/index.ts",
    output: {
      path: path.resolve(__dirname, 'public', 'js'),
      filename: 'scripts.bundle.js'
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
      ]
    }  
  };