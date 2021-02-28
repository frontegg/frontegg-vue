import get from 'get-value';
import { FRONTEGG_STORE_KEY } from './constants';
import { FronteggStore } from './interfaces';

const defaultGetter = (prop: any) => (state: FronteggStore) => get(state, prop);

const simpleMappers = (props: any, getter: any) => function () {
  // @ts-ignore
  const vueInstance: any = this;

  const slices = [].concat.apply([], props);
  const state = vueInstance[FRONTEGG_STORE_KEY].getState();
  vueInstance.FRONTEGG_REDUX_BINDINGS = slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: getter(prop),
  }), vueInstance.FRONTEGG_REDUX_BINDINGS || {});

  return slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: getter(prop)(state),
  }), {});
};

const objectMappers = (obj: any, fallbackGetter: any) => function () {
  // @ts-ignore
  const vueInstance: any = this;

  const slices = Object.keys(obj);
  const state = vueInstance[FRONTEGG_STORE_KEY].getState();

  vueInstance.FRONTEGG_REDUX_BINDINGS = slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: typeof obj[prop] === 'function' ? obj[prop].bind(vueInstance) : fallbackGetter(obj[prop]),
  }), vueInstance.FRONTEGG_REDUX_BINDINGS || {});

  return slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: typeof obj[prop] === 'function' ? obj[prop].call(vueInstance, state) : fallbackGetter(obj[prop])(state),
  }), {});
};

// export const mapState = (component: any, ...props: any[]) => {
//   const fallbackGetter = (prop: any) => (state: FronteggStore) => get(state, prop);
//   const [obj] = props;
//   const vueInstance: any = component;
//
//   const slices = Object.keys(obj);
//   const state = vueInstance[FRONTEGG_STORE_KEY].getState();
//
//   vueInstance.FRONTEGG_REDUX_BINDINGS = slices.reduce((result, prop) => Object.assign({}, result, {
//     [prop]: typeof obj[prop] === 'function' ? obj[prop].bind(vueInstance) : fallbackGetter(obj[prop]),
//   }), vueInstance.FRONTEGG_REDUX_BINDINGS || {});
//
//   return slices.reduce((result, prop) => Object.assign({}, result, {
//     [prop]: typeof obj[prop] === 'function' ? obj[prop].call(vueInstance, state) : fallbackGetter(obj[prop])(state),
//   }), {});
// };

/**
 * maps redux state to data attributes
 * @param {*} props array / strings / mapper object
 */
export default (...props: any[]) => {
  const [obj] = props;

  let mapper = {};
  if (!Array.isArray(obj) && typeof obj === 'object') {
    /**
     * mapState({ foo: 'bar', foo: state => state('bar') })
     */
    mapper = objectMappers(obj, defaultGetter);
  } else {
    /**
     * mapState(['foo', 'bar', 'baz']) \\ mapState('foo', 'bar', 'baz')
     */
    mapper = simpleMappers(props, defaultGetter);
  }
  return mapper;
};
