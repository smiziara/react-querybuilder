import type { RuleGroupTypeAny } from '@react-querybuilder/core';
import type { PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type QueriesSliceState = Record<string, RuleGroupTypeAny>;

export interface SetQueryStateParams {
  qbId: string;
  query: RuleGroupTypeAny;
}

const initialState: QueriesSliceState = {};

interface QueriesReducers extends SliceCaseReducers<QueriesSliceState> {
  setQueryState: (
    state: QueriesSliceState,
    action: PayloadAction<SetQueryStateParams>
  ) => void;
}

export const queriesSlice: Slice<QueriesSliceState, QueriesReducers, 'queries'> = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    setQueryState: (state, { payload: { qbId, query } }: PayloadAction<SetQueryStateParams>) => {
      state[qbId] = query;
    },
  },
});

export const queriesSliceSelectors = {
  getQuerySelectorById: (state: QueriesSliceState, qbId: string): RuleGroupTypeAny => state[qbId],
};
