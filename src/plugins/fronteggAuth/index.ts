import { reducer, sagas, storeName } from './Api';
import { initialState } from './Api/initialState';

export const AuthPlugin = {
    storeName,
    preloadedState: {
        ...initialState,
    },
    reducer,
    sagas
}

export default {
    install(Vue, options) {
        console.log('Auth plugin installed')
    }
};