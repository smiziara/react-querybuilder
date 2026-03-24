import type {
  BaseOption,
  FlexibleOptionListProp,
  FullOption,
  FullOptionList,
  RuleGroupTypeAny,
  RuleType,
} from '@react-querybuilder/core';
import { prepareOptionList } from '@react-querybuilder/core';
import type { AsyncThunk } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AsyncOptionListsSliceState } from './types';

export const DEFAULT_CACHE_TTL = 1_800_000; // 30 minutes

interface GetOptionListsAsyncArg {
  cacheKey: string;
  cacheTTL?: number;
  value: string | undefined;
  ruleOrGroup?: RuleType | RuleGroupTypeAny;
  loadOptionList: (
    value: string | undefined,
    meta: { ruleOrGroup?: RuleType | RuleGroupTypeAny }
  ) => Promise<FlexibleOptionListProp<BaseOption>>;
}

interface GetOptionListsAsyncReturn {
  cacheKey: string;
  data: FullOptionList<FullOption>;
  fromCache: boolean;
}

export const getOptionListsAsync: AsyncThunk<
  GetOptionListsAsyncReturn,
  GetOptionListsAsyncArg,
  { rejectValue: string }
> = createAsyncThunk<GetOptionListsAsyncReturn, GetOptionListsAsyncArg, { rejectValue: string }>(
  'asyncOptionLists/asyncOptionListsThunk',
  async (params, { getState, rejectWithValue }) => {
    const { cacheKey, cacheTTL, value, loadOptionList } = params;
    const state = getState() as { asyncOptionLists: AsyncOptionListsSliceState };
    const cached = state.asyncOptionLists.cache[cacheKey];

    if (
      cached &&
      Date.now() - cached.timestamp < (cacheTTL ?? /* istanbul ignore next */ DEFAULT_CACHE_TTL)
    ) {
      return { cacheKey, data: cached.data, fromCache: true };
    }

    try {
      const rawList = await loadOptionList(value, params);
      const data = prepareOptionList({ optionList: rawList }).optionList;
      return { cacheKey, data, fromCache: false };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: ({ cacheKey }, { getState }) => {
      const state = getState() as { asyncOptionLists: AsyncOptionListsSliceState };
      const loading = state.asyncOptionLists.loading[cacheKey];
      return !loading;
    },
  }
);
