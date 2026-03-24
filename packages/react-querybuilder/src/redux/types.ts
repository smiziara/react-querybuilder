import type { EnhancedStore, Slice } from '@reduxjs/toolkit';
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { QueriesSliceState } from './queriesSlice';
import type { WarningsSliceState } from './warningsSlice';

export interface RqbState {
  queries: QueriesSliceState;
  warnings: WarningsSliceState;
}

export type RqbStore = EnhancedStore<RqbState> & { addSlice: (slice: Slice) => void };
