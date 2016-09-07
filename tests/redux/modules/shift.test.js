import reducer, { defaultState } from 'redux/modules/shift';
import deepFreeze from 'deep-freeze';

describe('(Redux) shift', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState);
    });
  });
});
