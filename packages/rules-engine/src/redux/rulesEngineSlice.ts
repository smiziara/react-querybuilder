import type { PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RulesEngineAny } from '../types';
import type { RulesEngineSliceState } from './types';

export interface SetRulesEngineStateParams {
  reId: string;
  rulesEngine: RulesEngineAny;
}

const initialState: RulesEngineSliceState = {};

const name = 'rulesEngines';

interface RulesEngineReducers extends SliceCaseReducers<RulesEngineSliceState> {
  setRulesEngineState: (
    state: RulesEngineSliceState,
    action: PayloadAction<SetRulesEngineStateParams>
  ) => void;
}

export const rulesEngineSlice: Slice<RulesEngineSliceState, RulesEngineReducers, typeof name> =
  createSlice({
    name,
    initialState,
    reducers: {
      setRulesEngineState: (
        state,
        { payload: { reId, rulesEngine } }: PayloadAction<SetRulesEngineStateParams>
      ) => {
        state[reId] = rulesEngine;
      },
    },
  });

export interface RulesEngineSliceSelectors {
  getRulesEngineSelectorById: (state: RulesEngineSliceState, reId: string) => RulesEngineAny;
}

export const rulesEngineSliceSelectors: RulesEngineSliceSelectors = {
  getRulesEngineSelectorById: (state: RulesEngineSliceState, reId: string): RulesEngineAny =>
    state[reId],
};
