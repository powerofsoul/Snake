module.exports = {
 entry: './compiled/main.js',
 output: {
   filename: './out/game.js',
   path: __dirname
 },
 module: {
   rules: [
     {
       enforce: 'pre',
       test: /\.js$/,
       loader: "source-map-loader"
     },
     {
       enforce: 'pre',
       test: /\.tsx?$/,
       use: "source-map-loader"
     }
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
 devtool: 'inline-source-map',
};