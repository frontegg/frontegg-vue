import { EnhancedStore } from '@reduxjs/toolkit';


export class StoreHolder {
  private static instance: StoreHolder;
  private store!: EnhancedStore;

  private static getInstance() {
    if (!StoreHolder.instance) {
      StoreHolder.instance = new StoreHolder();
    }
    return StoreHolder.instance;
  }

  static setStore(store: EnhancedStore) {
    StoreHolder.getInstance().store = store;
  }

  static getStore(): EnhancedStore {
    return StoreHolder.getInstance().store;
  }
}
