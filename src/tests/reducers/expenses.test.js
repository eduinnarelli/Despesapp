import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test ('should set default state', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[2]]);

});

test('should not remove expenses if id not found', () => {

  const action = {
    type: 'REMOVE_EXPENSE',
    id: -1
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);

});

test('should add an expense', () => {

  const expense = {
    id: '4',
    description: 'Pizza',
    note: 'hmm',
    amount: 4325,
    createdAt: 0
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([...expenses, expense]);

});

test('should edit an expense', () => {

  const updates = {
    description: 'Cinema',
    note: 'The Favourite',
    amount: 1000
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates
  };

  const editedExpense = {
    ...expenses[1],
    ...updates
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], editedExpense, expenses[2]]);

});

test('should not edit expense if id not found', () => {

  const action = {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: {
      description: 'Cinema'
    }
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);

});