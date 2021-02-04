import { getDefaultMiddleware, combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootInitialState, rootReducer } from './reducer';
import { PluginConfig } from '@frontegg/react-core';
import { all, call } from 'redux-saga/effects';
import { VueConstructor } from 'vue';
import { ContextHolder, ContextOptions } from '@frontegg/rest-api';
import { Unsubscribe } from 'redux';
import set from 'set-value';
import { FRONTEGG_STORE_KEY } from '@/plugins/fronteggCore/constants';
import mapState from './map-state';

const isSSR = typeof window === 'undefined';

/**
 * receive contextOption and plugins, combine reducers, initial states and construct frontegg store
 * @param contextOptions
 * @param plugins
 */
const combinedPluginsStore = (contextOptions: ContextOptions, plugins: PluginConfig[]) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

  const baseName = isSSR
    ? ''
    : window.location.pathname.substring(0, window.location.pathname.lastIndexOf(location.pathname));

  const onRedirectTo = (_path: string, opts?: RedirectOptions) => {
    console.log("onRedirectTo", _path)
    let path = _path;
    if (path.startsWith(baseName)) {
      path = path.substring(baseName.length);
    }
    window.location.href = path
    // if (opts?.refresh && !isSSR) {
    //   window.Cypress ? history.push(path) : (window.location.href = path);
    // } else {
    //   opts?.replace ? history.replace(path) : history.push(path);
    // }
  }
  
  ContextHolder.setOnRedirectTo(onRedirectTo)
  
  const devTools = { name: 'Frontegg Store' };
  const reducer = combineReducers({
    root: rootReducer,
    ...plugins.reduce((p, n) => ({ ...p, [n.storeName]: n.reducer }), {}),
  });
  const preloadedState = {
    root: { ...rootInitialState, context: contextOptions,  },
    ...plugins.reduce(
      (p, n) => ({
        ...p,
        [n.storeName]: {
          ...n.preloadedState,
          onRedirectTo,
        },
      }),
      {},
    ),
  };
  const fronteggStore = configureStore({
    reducer,
    preloadedState,
    middleware: [...middleware, ...([])],
    devTools,
  });

  function* rootSaga() {
    yield all(plugins.map(({ sagas }) => call(sagas)));
  }

  sagaMiddleware.run(rootSaga);
  return fronteggStore;
};

export default {
  install(Vue: VueConstructor, options: ContextOptions) {
    ContextHolder.setContext(options);
    
    let pluginRegistered = false;
    const plugins: PluginConfig[] = [];
    let store: EnhancedStore;

    const registerPlugins = () => {
      console.log('registering plugins', plugins);
      store = combinedPluginsStore(options, plugins);
    };

    Vue.registerFronteggPlugin = (pluginConfig: PluginConfig) => {
      console.log('new register request for plugin', pluginConfig);
      plugins.push(pluginConfig);
    };

    const syncStateWithComponent = (component: Vue, bindings: any) => () => {
      const state = store.getState();

      Object.keys(bindings).forEach(prop => {
        const getter = bindings[prop];
        if (!getter) {
          return;
        }
        set(component._data, prop, getter(state));
      });
    };

    Vue.mixin({
      beforeCreate() {
        if (!pluginRegistered) {
          pluginRegistered = true;
          registerPlugins();
        }
        // subscribe to state if required

        if (!this[FRONTEGG_STORE_KEY]) {
          this[FRONTEGG_STORE_KEY] = store;
        }

        // @ts-ignore
        this.mapState = (...props: any[]) => mapState(...props).call(this);
      },
      created() {
        // @ts-ignore
        if (this.FRONTEGG_REDUX_BINDINGS) {
          // @ts-ignore
          this.FRONTEGG_UNSUBSCRIBE = store.subscribe(syncStateWithComponent(this, this.FRONTEGG_REDUX_BINDINGS));
        }
      },
      beforeDestroy() {
        (this as Vue).FRONTEGG_UNSUBSCRIBE?.();
      },
    });
  },
};
