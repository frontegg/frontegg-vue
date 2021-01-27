import { reducer, sagas, storeName } from './Api';
import { initialState } from './Api/initialState';

export const AuditsPlugin = {
    storeName,
    preloadedState: {
        ...initialState,
    },
    reducer,
    sagas
}

export default {
    install(Vue, options) {
        console.log('Audits plugin installed')
    }
}


