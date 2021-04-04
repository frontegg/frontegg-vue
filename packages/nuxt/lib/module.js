const { resolve } = require('path');

export default function(moduleOptions) {
  const options = Object.assign({}, this.options.frontegg, moduleOptions);

  debugger;
  const pluginOpts = {
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'frontegg-nuxt.js',
    ssr: false,
    options,
  };

  this.addPlugin(pluginOpts);
}
