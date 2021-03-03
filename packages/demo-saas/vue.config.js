module.exports = {
  transpileDependencies: [],
  devServer: { port: 3000 },
  chainWebpack: config => config.resolve.symlinks(false),
};
