import { ContextHolder, ContextOptions, RedirectOptions } from '@frontegg/rest-api';
import { getDefaultMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import set from 'set-value';
import { PluginConfig } from './interfaces';
import { rootInitialState, rootReducer } from './reducer';
import { getStore } from './utils';

/**
 * receive contextOption and plugins, combine reducers, initial states and construct frontegg store
 * @param contextOptions
 * @param plugins
 * @param router
 */

export const combinedPluginsStore = (contextOptions: ContextOptions, plugins: PluginConfig[], router: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

  const baseName = window.location.pathname.substring(0, window.location.pathname.lastIndexOf(location.pathname));

  const onRedirectTo = (_path: string, opts?: RedirectOptions) => {
    let path = _path;
    if (path.startsWith(baseName)) {
      path = path.substring(baseName.length);
    }
    if (opts?.refresh) {
      router.push(path);
    } else {
      opts?.replace ? router.replace(path) : router.push(path);
    }
  };

  ContextHolder.setOnRedirectTo(onRedirectTo);

  const devTools = { name: 'Frontegg Store' };
  const reducer = combineReducers({
    root: rootReducer,
    ...plugins.reduce((p, n) => ({ ...p, [n.storeName]: n.reducer }), {}),
  });
  const preloadedState = {
    root: { ...rootInitialState, context: contextOptions },
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

export const syncStateWithComponent = (component: any, bindings: any) => () => {
  const state = getStore(component).getState();
  Object.keys(bindings).forEach(prop => {
    const getter = bindings[prop];
    if (!getter) {
      return;
    }
    set(component._data, prop, getter(state));
  });
};
