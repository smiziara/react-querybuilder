import type { AnyAction, PayloadAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { Dispatch } from 'redux';
import { QueryBuilderStateContext } from 'react-querybuilder';
import type { ReactReduxContextValue, TypedUseSelectorHook } from 'react-redux';
import { createDispatchHook, createSelectorHook, createStoreHook } from 'react-redux';
import type { RulesEngine, RulesEngineIC } from '../types';
import type { SetRulesEngineStateParams } from './rulesEngineSlice';
import { rulesEngineSlice } from './rulesEngineSlice';
import type { RqbState, RulesEngineSliceState } from './types';

declare module './types' {
  export interface RqbState {
    rulesEngines: RulesEngineSliceState;
  }
}

type NonNullCtx = React.Context<ReactReduxContextValue<RqbState>>;

export const useRQB_INTERNAL_QueryBuilderStore: () => import('redux').Store<RqbState> = createStoreHook(
  QueryBuilderStateContext as unknown as NonNullCtx
) as () => import('redux').Store<RqbState>;

export const useRQB_INTERNAL_QueryBuilderDispatch: UseQueryBuilderDispatch =
  createDispatchHook(
    QueryBuilderStateContext as unknown as NonNullCtx
  ) as unknown as UseQueryBuilderDispatch;
type UseQueryBuilderDispatch = () => ThunkDispatch<RqbState, undefined, AnyAction> & Dispatch;

export const useRQB_INTERNAL_QueryBuilderSelector: TypedUseSelectorHook<RqbState> =
  createSelectorHook(QueryBuilderStateContext as unknown as NonNullCtx);

export const _RQB_INTERNAL_dispatchThunk =
  ({
    payload,
    onRulesEngineChange,
  }: {
    payload: SetRulesEngineStateParams;
    onRulesEngineChange?:
      | ((rulesEngine: RulesEngine) => void)
      | ((rulesEngine: RulesEngineIC) => void);
  }): ThunkAction<void, RqbState, unknown, PayloadAction<SetRulesEngineStateParams>> =>
  dispatch => {
    dispatch(rulesEngineSlice.actions.setRulesEngineState(payload));
    if (typeof onRulesEngineChange === 'function') {
      onRulesEngineChange(payload.rulesEngine as never /* ??? */);
    }
  };
