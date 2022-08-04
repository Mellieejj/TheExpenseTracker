import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpense = ({route, navigation}) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(exp => exp.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = (expenseData) => {
    if (isEditing){
      expensesCtx.updateExpense(editedExpenseId, expenseData)
    } else {
      expensesCtx.addExpense(expenseData)
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        defaultValues={selectedExpense}
        onCancel={cancelHandler} 
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
      />

      <View style={styles.deleteContainer}>
      {isEditing &&  
         <IconButton 
         iconName={'trash'} 
         iconColor={GlobalStyles.colors.error500} 
         iconSize={36} 
         onPress={deleteExpenseHandler} 
         />
        } 
        </View>
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24, 
    backgroundColor: GlobalStyles.colors.primary800
  },
 
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})