import { ContextHolder, ContextOptions, RedirectOptions } from '@frontegg/rest-api';
import { getDefaultMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import set from 'set-value';
import { PluginConfig } from './interfaces';
import { rootInitialState, rootReducer } from './reducer';
import { getStore, getStoreBinding, setStoreBinding } from './utils';
import { AuthState } from '@frontegg/redux-store/auth';
import get from 'get-value';
import VueRouter from 'vue-router';

/**
 * receive contextOption and plugins, combine reducers, initial states and construct frontegg store
 * @param contextOptions
 * @param plugins
 * @param router
 */
export const combinedPluginsStore = (contextOptions: ContextOptions, plugins: PluginConfig[], router: VueRouter) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

  const baseName = window.location.pathname.substring(0, window.location.pathname.lastIndexOf(location.pathname));

  const onRedirectTo = (_path: string, opts?: RedirectOptions) => {
    let path = _path;
    if (path.startsWith(baseName)) {
      path = path.substring(baseName.length);
    }
    if (opts?.refresh) {
      window.location.href = path;
    } else {
      if (path === router.currentRoute.path) {
        return;
      }
      if (opts?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
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

  Object.keys(bindings).forEach(subState => {
    Object.keys(bindings[subState]).forEach(prop => {
      const getter = bindings[subState][prop];
      if (!getter) {
        return;
      }
      set(component._data, prop, getter(get(state,subState)));
    });
  });
};

export const defaultGetterGenerator = (prop: string) => (state: AuthState) => get(state, prop);

const bindOrFallback = (vueInstance: any, value: any, fallbackGetter: any) => {
  return typeof value === 'function' ? value.bind(vueInstance) : fallbackGetter(value);
};
const directCallOrFallback = (vueInstance: any, value: any, fallbackGetter: any, state: any) => {
  return typeof value === 'function' ? value.call(vueInstance, state) : fallbackGetter(value)(state);
};

export const generateStoreBindingBySlices = (vueInstance: any, subState: string, slices: string[], obj: any, fallbackGetter: any) => {
  return slices.reduce((result, prop) => Object.assign({}, result, {
    [subState]: {
      ...result[subState],
      [prop]: bindOrFallback(vueInstance, obj[prop], fallbackGetter),
    },
  }), getStoreBinding(vueInstance) || {});
};

export const objectMappers = (subState: string, obj: any, fallbackGetter: any) => function () {
  // @ts-ignore
  const vueInstance: any = this;
  debugger;

  const slices = Object.keys(obj);
  const state = get(getStore(vueInstance).getState(), subState);

  const calculatedBinding = generateStoreBindingBySlices(vueInstance, subState, slices, obj, fallbackGetter);
  setStoreBinding(vueInstance, calculatedBinding);

  return slices.reduce((result, prop: string) => Object.assign({}, result, {
    [prop]: directCallOrFallback(vueInstance, obj[prop], fallbackGetter, state),
  }), {});
};


export const simpleMappers = (subState: string, props: any, getter: any) => function () {
  // @ts-ignore
  const vueInstance: any = this;
  debugger;
  const slices = [].concat.apply([], props);
  const state = get(getStore(vueInstance).getState(), subState);

  const calculatedBinding = slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: getter(prop),
  }), getStoreBinding(vueInstance) || {});
  setStoreBinding(vueInstance, { [subState]: calculatedBinding });

  return slices.reduce((result, prop) => Object.assign({}, result, { [prop]: getter(prop)(state) }), {});
};
