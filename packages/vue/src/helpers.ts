import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';
import set from 'set-value';
import { getStore, getStoreBinding, setStoreBinding } from './utils';
import { AuthState } from '@frontegg/redux-store';
import get from 'get-value';
import VueRouter from 'vue-router';
import { StoreHolder } from './StoreHolder';

export const setupOnRedirectTo = (router: VueRouter) => {
  const baseName = router.options.base || '';
  StoreHolder.setBasename(baseName);
  const onRedirectTo = (_path: string, opts?: RedirectOptions) => {
    let path = _path;

    if (path.startsWith(baseName) && baseName !== '/') {
      path = path.substring(baseName.length - 1);
    }
    if (opts?.refresh) {
      window.location.href = path;
    } else {

      if (opts?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    }
  };

  ContextHolder.setOnRedirectTo(onRedirectTo);
  return onRedirectTo;
};

export const syncStateWithComponent = (component: any, bindings: any) => () => {
  const state = getStore(component).getState();

  Object.keys(bindings).forEach(subState => {
    Object.keys(bindings[subState]).forEach(prop => {
      const getter = bindings[subState][prop];
      if (!getter) {
        return;
      }
      set(component._data, prop, getter(get(state, subState)));
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
  const slices = [].concat.apply([], props);
  const state = get(getStore(vueInstance).getState(), subState);

  const calculatedBinding = slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: getter(prop),
  }), getStoreBinding(vueInstance) || {});
  setStoreBinding(vueInstance, { [subState]: calculatedBinding });

  return slices.reduce((result, prop) => Object.assign({}, result, { [prop]: getter(prop)(state) }), {});
};
