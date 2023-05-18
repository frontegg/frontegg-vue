import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContextOptions } from '@frontegg/rest-api';
import sdkVersion from './sdkVersion';
export interface RootState {
  context?: ContextOptions;
}

const initialState: RootState = {
  context: undefined,
};

const { reducer, actions } = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setContext: {
      prepare: (context: ContextOptions) => ({ payload: context }),
      reducer: (state: RootState, { payload }: PayloadAction<ContextOptions>) => ({
        ...state,
        context: {
          metaDataHeaders: {
            framework: 'vuejs',
            version: `@frontegg/vuejs@${sdkVersion.version}`,
          },
          ...payload
        },
      }),
    },
  },
});

export { reducer as rootReducer, actions as rootActions, initialState as rootInitialState };
