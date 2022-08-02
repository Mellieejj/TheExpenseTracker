import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ExpenseItem from './ExpenseItem'

const ExpensesList = ({expenses}) => {
  const renderExpenseItem = (itemData) => {
    return <ExpenseItem 
              {...itemData.item}
              // description={itemData.item.description} 
              // date={itemData.item.date.toString()}
              // amount={itemData.item.amount}
            />
  }
  
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({})