import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import locale from 'numeral/locales';

numeral.locale('pt-br');

export const ExpensesSummary = (props) => {

  const expenseWord = props.expenses.length > 1 ? 'despesas' : 'despesa';
  const formattedExpensesTotal = numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00');

  return (

    <div>

      {

        props.expenses.length > 0 &&

        <h4>
          Visualizando {props.expenses.length} {expenseWord},
          totalizando {' '} {formattedExpensesTotal}
        </h4>

      }

    </div>

  );
  
};

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpensesSummary); 
