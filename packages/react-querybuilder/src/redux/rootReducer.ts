import type { Reducer, Slice, AnyAction } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import type { QueriesSliceState } from './queriesSlice';
import { queriesSlice } from './queriesSlice';
import type { WarningsSliceState } from './warningsSlice';
import { warningsSlice } from './warningsSlice';

export interface LazyLoadedSlices {}

type RootState = {
  queries: QueriesSliceState;
  warnings: WarningsSliceState;
} & LazyLoadedSlices;

const staticReducers = {
  queries: queriesSlice.reducer,
  warnings: warningsSlice.reducer,
};

const injectedReducers: Record<string, Reducer> = {};

function createRootReducer(): Reducer<RootState> {
  return combineReducers({ ...staticReducers, ...injectedReducers }) as unknown as Reducer<RootState>;
}

let currentRootReducer = createRootReducer();

export const rootReducer: Reducer<RootState> & { inject: (slice: Slice) => void } = Object.assign(
  (state: RootState | undefined, action: AnyAction) => currentRootReducer(state, action),
  {
    inject: (slice: Slice) => {
      if (!injectedReducers[slice.name]) {
        injectedReducers[slice.name] = slice.reducer;
        currentRootReducer = createRootReducer();
      }
    },
  }
);
