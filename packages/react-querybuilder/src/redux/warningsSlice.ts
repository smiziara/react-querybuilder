import type { PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { messages } from '../messages';

type ValuesAsKeys<T> =
  T extends Record<infer _K, infer V>
    ? [V] extends [string]
      ? { [Key in V]: boolean }
      : never
    : never;
type ValuesType<T> =
  T extends Record<infer _K, infer V> ? ([V] extends [string] ? V : never) : never;
export type WarningsSliceState = ValuesAsKeys<typeof messages>;
export type Messages = ValuesType<typeof messages>;
const initialState: WarningsSliceState = {
  [messages.errorInvalidIndependentCombinatorsProp]: false,
  [messages.errorUnnecessaryIndependentCombinatorsProp]: false,
  [messages.errorDeprecatedRuleGroupProps]: false,
  [messages.errorDeprecatedRuleProps]: false,
  [messages.errorBothQueryDefaultQuery]: false,
  [messages.errorUncontrolledToControlled]: false,
  [messages.errorControlledToUncontrolled]: false,
  [messages.errorEnabledDndWithoutReactDnD]: false,
  [messages.errorDeprecatedDebugImport]: false,
};

interface WarningsReducers extends SliceCaseReducers<WarningsSliceState> {
  // oxlint-disable-next-line typescript/no-explicit-any
  rqbWarn: (state: any, action: PayloadAction<Messages>) => void;
}

export const warningsSlice: Slice<WarningsSliceState, WarningsReducers, 'warnings'> = createSlice({
  name: 'warnings',
  initialState,
  reducers: {
    rqbWarn: (state, { payload }: PayloadAction<Messages>) => {
      if (!state[payload]) {
        console.error(payload);
        state[payload] = true;
      }
    },
  },
});
