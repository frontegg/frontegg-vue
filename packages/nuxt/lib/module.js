const { resolve } = require('path');

export default function(moduleOptions) {
  const options = Object.assign({}, this.options.frontegg, moduleOptions);

  const pluginOpts = {
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'frontegg-nuxt.js',
    ssr: false,
    options: JSON.stringify(options),
  };

  this.addPlugin(pluginOpts);
}
