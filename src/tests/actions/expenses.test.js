import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExpense,
  startAddExpense, 
  editExpense,
  startEditExpense, 
  removeExpense,
  startRemoveExpense, 
  setExpenses,
  startSetExpenses 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {

  const expensesData = {};

  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expensesData[id] = {description, note, amount, createdAt};
  });

  database.ref('expenses').set(expensesData).then(() => done());

});

test('should setup remove expense action object', () => {

  const action = removeExpense({id: '123abc'});

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });

});

test('should remove expense from firebase', (done) => {

  const store = createMockStore({});

  store.dispatch(startRemoveExpense({id: 1})).then(() => {

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: 1
    });

    return database.ref(`expenses/${1}`).once('value');
    
  }).then((snapshot) => {

    expect(snapshot.val()).toBeFalsy();
    done()

  });
  
});

test('should setup edit expense action object', () => {

  const action = editExpense('123abc', {note: 'New note'});

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note'
    }
  });

});

test('should edit expense from firebase', (done) => {

  const store = createMockStore({});

  const updates = {
    description: 'Caldo de cana',
    amount: 500,
    note: 'Hmmmmm'
  };

  store. dispatch(startEditExpense(2, updates)).then(() => {

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: 2,
      updates
    });

    return database.ref(`expenses/${2}`).once('value');

  }).then((snapshot) => {

    expect(snapshot.val()).toEqual({
      createdAt: expenses[1].createdAt,
      ...updates
    });

    done();

  });

});

test('should setup add expense action object with provided values', () => {

  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });

});

test('should add expense to database and store', (done) => {

  const store = createMockStore({});

  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'Old one broke', 
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');

  }).then((snapshot) => {

    expect(snapshot.val()).toEqual(expenseData);
    done();

  });

});

test('should add expense with defaults to database and store', (done) => {

  const store = createMockStore({});

  const defaultData = {
    description: '',
    note: '', 
    amount: 0, 
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');

  }).then((snapshot) => {

    expect(snapshot.val()).toEqual(defaultData);
    done();

  });

});

test('should setup set expense action object with data', () => {
  
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })

});

test('should fetch the expenses from firebase', (done) => {

  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });

    done();

  });

});