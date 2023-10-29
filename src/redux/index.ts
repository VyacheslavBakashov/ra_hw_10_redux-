import { combineReducers, legacy_createStore } from 'redux';

import { servicesReducer } from './reducers/services';

const rootReducer = combineReducers({
  services: servicesReducer,
});

export const setupStore = () => legacy_createStore(rootReducer);

export type AppStoreTypes = ReturnType<typeof setupStore>;
export type AppStateTypes = ReturnType<typeof rootReducer>;
export type AppDispatchTypes = AppStoreTypes['dispatch'];
