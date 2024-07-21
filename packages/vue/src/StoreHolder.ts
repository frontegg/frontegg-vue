import { FronteggStore } from '@frontegg/redux-store';


export class StoreHolder {
  private static instance: StoreHolder;
  private store!: FronteggStore;
  private baseName: string | undefined;

  private static getInstance() {
    if (!StoreHolder.instance) {
      StoreHolder.instance = new StoreHolder();
    }
    return StoreHolder.instance;
  }

  static setStore(store: FronteggStore) {
    StoreHolder.getInstance().store = store;
  }

  static getStore(): FronteggStore {
    return StoreHolder.getInstance().store;
  }

  static setBasename(baseName: string | undefined) {
    StoreHolder.getInstance().baseName = baseName;
  }

  static getBasename(): string | undefined {
    return StoreHolder.getInstance().baseName;
  }
}
