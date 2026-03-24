import type { RuleGroupType, RuleGroupTypeIC } from '@react-querybuilder/core';
import type { ConfigureStoreOptions, PayloadAction, ThunkAction, AnyAction } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import type { SetQueryStateParams } from '../queriesSlice';
import { queriesSlice } from '../queriesSlice';
import { QueryBuilderStateContext } from '../QueryBuilderStateContext';
import { rootReducer } from '../rootReducer';
import type { RqbState } from '../types';
import type { Messages } from '../warningsSlice';
import { warningsSlice } from '../warningsSlice';
import type { UseQueryBuilderDispatch, UseQueryBuilderStore } from './hooks';
import { getInternalHooks } from './hooks';

export const _RQB_INTERNAL_dispatchThunk =
  ({
    payload,
    onQueryChange,
  }: {
    payload: SetQueryStateParams;
    onQueryChange?: ((query: RuleGroupType) => void) | ((query: RuleGroupTypeIC) => void);
  }): ThunkAction<void, RqbState, unknown, PayloadAction<SetQueryStateParams>> =>
  dispatch => {
    dispatch(queriesSlice.actions.setQueryState(payload));
    if (typeof onQueryChange === 'function') {
      onQueryChange(payload.query as never /* ??? */);
    }
  };

const internalHooks = getInternalHooks(QueryBuilderStateContext);

export const useRQB_INTERNAL_QueryBuilderDispatch: UseQueryBuilderDispatch =
  internalHooks.useRQB_INTERNAL_QueryBuilderDispatch;
export const useRQB_INTERNAL_QueryBuilderStore: UseQueryBuilderStore =
  internalHooks.useRQB_INTERNAL_QueryBuilderStore;
export const useRQB_INTERNAL_QueryBuilderSelector: TypedUseSelectorHook<RqbState> =
  internalHooks.useRQB_INTERNAL_QueryBuilderSelector;

const { rqbWarn: _SYNC_rqbWarn } = warningsSlice.actions;

export const rqbWarn =
  (msg: Messages): ThunkAction<void, RqbState, unknown, PayloadAction<Messages>> =>
  dispatch => {
    setTimeout(() => dispatch(_SYNC_rqbWarn(msg)));
  };

const preloadedState = {
  queries: queriesSlice.getInitialState(),
  warnings: warningsSlice.getInitialState(),
} as RqbState;

export const storeCommon: ConfigureStoreOptions = {
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [queriesSlice.actions.setQueryState.type],
        ignoredPaths: ['queries'],
      },
    }),
};
