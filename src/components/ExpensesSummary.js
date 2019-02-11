import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import locale from 'numeral/locales';

numeral.locale('pt-br');

export const ExpensesSummary = (props) => {

  const expenseWord = props.expenses.length == 1 ? 'despesa' : 'despesas';
  const formattedExpensesTotal = numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00');

  return (

    <div className="page-header">

      <div className="content-container">

        <h1 className="page-header__title">
          Visualizando {' '}
          <span>{props.expenses.length}</span>           
          {' '} {expenseWord} totalizando {' '}
          <span>{formattedExpensesTotal}</span>
        </h1>

        <div className="page-header__actions">
          <Link className="button" to="/create">Criar Despesa</Link>
        </div>

      </div>

    </div>

  );

};

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpensesSummary); 
