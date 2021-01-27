/* eslint-disable */ 
import { getDefaultMiddleware, combineReducers, configureStore, Reducer, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { rootInitialState, rootReducer } from './reducer';
import set from 'set-value'
import mapState from './map-state'
import { AuditsPlugin } from '../fronteggAudits'
import { AuthPlugin } from '../fronteggAuth'

// @ts-ignore
const combinedPluginsStore = (plugins) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];
    let fronteggStore: EnhancedStore;
    const devTools = process.env.NODE_ENV === 'development' || props.debugMode ? { name: 'Frontegg Store' } : undefined;
    const reducer = combineReducers({
      root: rootReducer,
      ...plugins.reduce((p, n) => ({ ...p, [n.storeName]: n.reducer }), {}),
    });
    const preloadedState = {
      root: { ...rootInitialState, context: 'init contx' },
      ...plugins.reduce(
        (p, n) => ({
          ...p,
          [n.storeName]: {
            ...n.preloadedState,
          },
        }),
        {}
      ),
    };
    return fronteggStore = configureStore({
      reducer,
      preloadedState,
      middleware: [...middleware, ...([])],
      devTools,
    });
}

export default {
    install(Vue, options) {
        const plugins = [AuthPlugin, AuditsPlugin]
        const store = combinedPluginsStore(plugins)

        Vue.prototype.registerFronteggPlugin = ({ component, store, actions = {}, binding = 'store' }) => {
            if (!store) {
                console.warn(`[fronteggCore]: No store attatched, please provide a redux-store to the connector`)
                return
            }

            const syncStateWithComponent = (component, bindings) => () => {
                const state = store.getState()
            
                Object.keys(bindings).forEach(prop => {
                  const getter = bindings[prop]
            
                  if (!getter) {
                    return
                  }
            
                  set(component._data, prop, getter(state))
                })
            }

            component.REDUX_VUEX_STORE = binding

            if (!component[component.REDUX_VUEX_STORE]) {
                component[component.REDUX_VUEX_STORE] = store
            }

            if (!component.REDUX_VUEX_ACTIONS) {
                component.REDUX_VUEX_ACTIONS = actions
            }

            component.mapState = (...props) => mapState(...props).call(component)
            // If the helper methods (mapState) registered store bindings, create subscriptions
            if (component.REDUX_VUEX_BINDINGS) {
                component.unsubscribe = store.subscribe(
                syncStateWithComponent(component, component.REDUX_VUEX_BINDINGS)
                )
            }
        }

        Vue.mixin({
            beforeCreate() {
                this.registerFronteggPlugin({component: this, store: store})
            },
            beforeDestroy () {
                this.unsubscribe && this.unsubscribe()
            }
        })
    }
}