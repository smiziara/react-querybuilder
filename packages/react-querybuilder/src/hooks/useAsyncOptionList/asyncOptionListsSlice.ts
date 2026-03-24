import type { PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CACHE_TTL, getOptionListsAsync } from './getOptionListsAsync';
import type { AsyncOptionListsSliceState, CachedOptionList } from './types';

export { DEFAULT_CACHE_TTL, getOptionListsAsync };

type State = AsyncOptionListsSliceState;

const initialState: State = { cache: {}, loading: {}, errors: {} };

const sliceName = 'asyncOptionLists';

interface AsyncOptionListsReducers extends SliceCaseReducers<State> {
  invalidateCache: (state: State, action: PayloadAction<string>) => void;
  clearAllCache: (state: State) => void;
}

export const asyncOptionListsSlice: Slice<State, AsyncOptionListsReducers, typeof sliceName> = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    invalidateCache: /* istanbul ignore next */ (state, { payload }: PayloadAction<string>) => {
      delete state.cache[payload];
      delete state.errors[payload];
    },
    clearAllCache: /* istanbul ignore next */ (state) => {
      state.cache = {};
      state.errors = {};
      state.loading = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOptionListsAsync.pending, (state, action) => {
        state.loading[action.meta.arg.cacheKey] = true;
        state.errors[action.meta.arg.cacheKey] = '';
      })
      .addCase(getOptionListsAsync.fulfilled, (state, action) => {
        const { cacheKey, data } = action.payload;
        state.cache[cacheKey] = {
          data,
          timestamp: Date.now(),
          validUntil:
            Date.now() + (action.meta.arg.cacheTTL ?? /* istanbul ignore next */ DEFAULT_CACHE_TTL),
        };
        state.loading[cacheKey] = false;
      })
      .addCase(getOptionListsAsync.rejected, (state, action) => {
        state.loading[action.meta.arg.cacheKey] = false;
        state.errors[action.meta.arg.cacheKey] = action.payload as string;
      });
  },
});

export interface AsyncOptionListsSliceSelectors {
  selectCache: (state: State) => typeof initialState.cache;
  selectLoading: (state: State) => typeof initialState.loading;
  selectErrors: (state: State) => typeof initialState.errors;
  selectCacheByKey: (state: State, cacheKey: string) => CachedOptionList;
  selectIsLoadingByKey: (state: State, cacheKey: string) => boolean;
  selectErrorByKey: (state: State, cacheKey: string) => string | null;
}

export const asyncOptionListsSliceSelectors: AsyncOptionListsSliceSelectors = {
  selectCache: /* istanbul ignore next */ (state: State) => state.cache,
  selectLoading: /* istanbul ignore next */ (state: State) => state.loading,
  selectErrors: /* istanbul ignore next */ (state: State) => state.errors,
  selectCacheByKey: /* istanbul ignore next */ (state: State, cacheKey: string): CachedOptionList =>
    state.cache[cacheKey] || null,
  selectIsLoadingByKey: /* istanbul ignore next */ (state: State, cacheKey: string): boolean =>
    state.loading[cacheKey] || false,
  selectErrorByKey: /* istanbul ignore next */ (state: State, cacheKey: string): string | null => {
    const error = state.errors[cacheKey];
    return error && error !== '' ? error : null;
  },
};
