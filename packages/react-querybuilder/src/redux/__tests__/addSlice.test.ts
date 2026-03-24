import type { Store } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getRqbStore, injectSlice } from '../getRqbStore';

interface CounterState {
  value: number;
}

const getAnyState = (store: Store) => store.getState();

it('adds a slice with addSlice', () => {
  const counterSliceAS = createSlice({
    name: 'counter-as',
    initialState: { value: 0 } as CounterState,
    reducers: { increment: state => void state.value++ },
  });

  const selectValue = (rootState: Record<string, unknown>) =>
    (rootState['counter-as'] as CounterState).value;

  const queryBuilderStore = getRqbStore();

  queryBuilderStore.addSlice(counterSliceAS);

  expect(queryBuilderStore.getState()).toHaveProperty('queries', {});
  expect(selectValue(getAnyState(queryBuilderStore))).toBe(0);

  queryBuilderStore.dispatch(counterSliceAS.actions.increment());
  expect(selectValue(getAnyState(queryBuilderStore))).toBe(1);
});

it('adds a slice with injectSlice', () => {
  const counterSliceIS = createSlice({
    name: 'counter-is',
    initialState: { value: 0 } as CounterState,
    reducers: { increment: state => void state.value++ },
  });

  const selectValue = (rootState: Record<string, unknown>) =>
    (rootState['counter-is'] as CounterState).value;

  injectSlice(counterSliceIS);

  const queryBuilderStore = getRqbStore();

  expect(queryBuilderStore.getState()).toHaveProperty('queries', {});
  expect(selectValue(getAnyState(queryBuilderStore))).toBe(0);

  queryBuilderStore.dispatch(counterSliceIS.actions.increment());
  expect(selectValue(getAnyState(queryBuilderStore))).toBe(1);
});
