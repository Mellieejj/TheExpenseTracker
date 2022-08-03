import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'

const ExpenseForm = () => {
  function amountChangedHandler () {}
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input 
          label={'Amount'} 
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangedHandler,
          }}
        />
        <Input 
          label={'Date'}   
          style={styles.rowInput}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: () => {},
          }}
          />
      </View>
      <Input label={'Description'}  textInputConfig={{
        multiline: true,
        // autoCorrect: false, // default is true
        // autoCapitalize: 'none'
        onChangeText: () => {}
      }}/>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  }
})