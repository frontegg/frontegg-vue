// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
import ts from 'rollup-plugin-typescript2';

const distFolder = path.join(process.cwd(), './dist/');

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const entryPoints = [
  'auth/index',
  'index',
];
const baseConfig = {
  input: 'src/index.ts',
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`,
          },
        ],
        customResolver: resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        }),
      }),
    ],
    replace: {
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    postVue: [],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
    },
  },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  '@frontegg/redux-store',
  '@frontegg/redux-store/auth',
  '@frontegg/redux-store/toolkit',
  '@frontegg/rest-api',
  'redux-saga',
  'redux-saga/effects',
  'set-value',
  'get-value',
  'vue-moment',
  '@reduxjs/toolkit',
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  '@frontegg/redux-store': 'fronteggReduxStore',
  '@frontegg/rest-api': 'fronteggRestApi',
  'vue-moment': 'vueMoment',
  '@reduxjs/toolkit': 'ReduxjsToolkit',
  'redux-saga': 'reduxSaga',
  'redux-saga/effects': 'reduxSagaEffects',
  'set-value': 'setValue',
  'get-value': 'getValue',
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    input: entryPoints.reduce((p, n) => ({ ...p, [n]: `./src/${n}.ts` }), {}),
    external,
    output: {
      // file: 'dist/frontegg-core.esm.js',
      dir: distFolder,
      entryFileNames: '[name].js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      ts({
        tsconfig: `${process.cwd()}/tsconfig.json`,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          'compilerOptions': {
            'declaration': true,
            'declarationDir': distFolder,
            'target': 'ES6',
            'module': 'ES6',
          },
        },
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          '@babel/preset-typescript',
          ['@babel/preset-env', { targets: esbrowserslist }],
        ],
      }),
      commonjs(),
    ],
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/frontegg-core.ssr.js',
      format: 'cjs',
      name: 'FronteggCore',
      exports: 'auto',
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
      }),
      ...baseConfig.plugins.postVue,
      ts({
        tsconfig: `${process.cwd()}/tsconfig.json`,
        tsconfigOverride: {
          'compilerOptions': {
            'declaration': false,
            'target': 'ES6',
            'module': 'ES6',
          },
        },
      }),
      babel(baseConfig.plugins.babel),
      commonjs(),
    ],
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/frontegg-core.min.js',
      format: 'iife',
      name: 'FronteggCore',
      exports: 'auto',
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      ts({
        tsconfig: `${process.cwd()}/tsconfig.json`,
        tsconfigOverride: {
          'compilerOptions': {
            'declaration': false,
            'target': 'ES6',
            'module': 'ES6',
          },
        },
      }),
      babel(baseConfig.plugins.babel),
      commonjs(),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
