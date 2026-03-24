import * as React from 'react';
import { Provider } from 'react-redux';
import { QueryBuilderStateContext, getRqbStore } from '../redux';

/**
 * Context provider for the `{@link QueryBuilder}` state store.
 *
 * @group Components
 */
export const QueryBuilderStateProvider = (props: {
  children: React.ReactNode;
}): React.JSX.Element => (
  // oxlint-disable-next-line typescript/no-explicit-any
  <Provider context={QueryBuilderStateContext as any} store={getRqbStore()}>
    {props.children}
  </Provider>
);
