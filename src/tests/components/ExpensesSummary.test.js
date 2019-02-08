import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render empty ExpensesSummary without expenses', () => {

  const wrapper = shallow(<ExpensesSummary expenses={[]}/>);
  expect(wrapper).toMatchSnapshot();

});

test('should render ExpensesSummary message with one expense', () => {

  const wrapper = shallow(<ExpensesSummary expenses={[expenses[1]]}/>);
  expect(wrapper).toMatchSnapshot();

});

test('should render ExpensesSummary message with multiple expenses', () => {

  const wrapper = shallow(<ExpensesSummary expenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();

});

