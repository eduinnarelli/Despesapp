const selectExpensesTotal = (expenses) => {

  const reducer = (acc, current) => acc + current;
  const amounts = expenses ? expenses.map(expense => expense.amount) : [0];

  return amounts.reduce(reducer, 0);

};

export default selectExpensesTotal;