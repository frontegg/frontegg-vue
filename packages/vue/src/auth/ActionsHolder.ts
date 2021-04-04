import { AuthActions } from '@frontegg/redux-store';


export class ActionsHolder {
  private static instance: ActionsHolder;
  private actions!: AuthActions;

  private static getInstance() {
    if (!ActionsHolder.instance) {
      ActionsHolder.instance = new ActionsHolder();
    }
    return ActionsHolder.instance;
  }

  static setActions(actions: AuthActions) {
    ActionsHolder.getInstance().actions = actions;
  }

  static getAction<K extends keyof AuthActions>(action: K): AuthActions[K] {
    return ActionsHolder.getInstance().actions[action];
  }
}
