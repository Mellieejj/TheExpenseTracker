import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const today = new Date();
  const recentExpenses = expensesCtx.expenses.filter(expense => (expense.date >= getDateMinusDays(today, 7)) && (expense.date <= today));

  return (
   <ExpensesOutput expensesPeriod={"Last 7 days"} expenses={recentExpenses} fallbackText={'No expenses for the last 7 days'}/> 
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})