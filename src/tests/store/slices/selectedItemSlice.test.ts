import { expect, test } from 'vitest';
import reducer, {
  setSelectedItem,
  setLoading,
} from '../../../store/slices/selectedItemSlice';
import { AstronomicalObject } from '../../../models/data.interface';

const initialState = {
  item: null,
  loading: false,
};

const item: AstronomicalObject = {
  uid: '1',
  name: 'Object 1',
  astronomicalObjectType: 'Type 1',
  location: { uid: 'loc1', name: 'Location 1' },
};

test('should handle initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
});

test('should handle setSelectedItem', () => {
  const actual = reducer(initialState, setSelectedItem(item));
  expect(actual.item).toEqual(item);
  expect(actual.loading).toEqual(true);

  const actualNull = reducer(actual, setSelectedItem(null));
  expect(actualNull.item).toBeNull();
  expect(actualNull.loading).toEqual(false);
});

test('should handle setLoading', () => {
  const actual = reducer(initialState, setLoading(true));
  expect(actual.loading).toEqual(true);

  const actualFalse = reducer(actual, setLoading(false));
  expect(actualFalse.loading).toEqual(false);
});
