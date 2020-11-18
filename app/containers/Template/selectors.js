import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the callbackPage state domain
 */

const selectCallbackPageDomain = state => state.callbackPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CallbackPage
 */

const makeSelectCallbackPage = () =>
  createSelector(
    selectCallbackPageDomain,
    substate => substate,
  );

export default makeSelectCallbackPage;
export { selectCallbackPageDomain };
