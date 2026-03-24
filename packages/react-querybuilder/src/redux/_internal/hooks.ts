import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { Dispatch, Store } from 'redux';
import React from 'react';
import type { ReactReduxContextValue, TypedUseSelectorHook } from 'react-redux';
import { createDispatchHook, createSelectorHook, createStoreHook } from 'react-redux';
import type { RqbState } from '../types';

type NonNullCtx = React.Context<ReactReduxContextValue<RqbState>>;

const genUseQueryBuilderDispatch = (
  ctx: React.Context<ReactReduxContextValue<RqbState> | null>
): UseQueryBuilderDispatch =>
  createDispatchHook(ctx as NonNullCtx) as unknown as UseQueryBuilderDispatch;
export type UseQueryBuilderDispatch = () => ThunkDispatch<RqbState, undefined, AnyAction> &
  Dispatch;

export type UseQueryBuilderStore = () => Store<RqbState>;

const genUseQueryBuilderStore = (
  ctx: React.Context<ReactReduxContextValue<RqbState> | null>
): UseQueryBuilderStore => createStoreHook(ctx as NonNullCtx) as UseQueryBuilderStore;

const genUseQueryBuilderSelector = (
  ctx: React.Context<ReactReduxContextValue<RqbState> | null>
): TypedUseSelectorHook<RqbState> => createSelectorHook(ctx as NonNullCtx);

export const getInternalHooks = (
  ctx: React.Context<ReactReduxContextValue<RqbState> | null>
): {
  useRQB_INTERNAL_QueryBuilderDispatch: UseQueryBuilderDispatch;
  useRQB_INTERNAL_QueryBuilderStore: UseQueryBuilderStore;
  useRQB_INTERNAL_QueryBuilderSelector: TypedUseSelectorHook<RqbState>;
} => ({
  useRQB_INTERNAL_QueryBuilderDispatch: genUseQueryBuilderDispatch(ctx),
  useRQB_INTERNAL_QueryBuilderStore: genUseQueryBuilderStore(ctx),
  useRQB_INTERNAL_QueryBuilderSelector: genUseQueryBuilderSelector(ctx),
});
