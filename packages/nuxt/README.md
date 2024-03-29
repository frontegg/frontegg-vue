<p align="center">
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">
  </a>
</p>
<h1 align="center">Frontegg-Nuxt</h1>

## Installation

Frontegg-Nuxt is available as an [npm package](https://www.npmjs.com/package/@frontegg/nuxt).

using **YARN**:

```
/* install frontegg-core */
yarn add @frontegg/nuxt
```

using **NPM**:

```
/* install frontegg-core */
npm install --save @frontegg/nuxt
```

### Setup

Then add it to the modules section in your nuxt.config.js:

```js
/* nuxt.config.js file */


/* this file generated by frontegg init script */

export default {
  modules: [
    '@frontegg/nuxt'
  ]
}
```

### Configure

Add an frontegg object to your nuxt.config.js to configure global options which will be applied to all requests:

```js

export default {
  modules: [
    '@frontegg/nuxt'
  ],

  frontegg: {
    contextOptions: {
      baseUrl: 'https://{SITE_NAME}.frontegg.com'
    }
  }
}
```

### Using Typescript?

add @frontegg/vue @frontegg/nuxt to the tsconfig file.

```json
{
  "compilerOptions": {
    "types": [
      "@frontegg/vue",
      "@frontegg/nuxt"
    ]
  }
}
```

## Contributing

The main purpose of this repository is to continue developing Frontegg React to making it faster and easier to use. Read
our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
