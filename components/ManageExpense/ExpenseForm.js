import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import Button from '../ui/Button';
import Input from './Input';

const ExpenseForm = ({defaultValues, onCancel, submitButtonLabel, onSubmit}) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    }, 
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    }
  });

  function inputChangedHandler (inputIdentifier, enteredValue, onSubmit) {
    setInputValues((prev) => {
      return {
        ...prev, 
        [inputIdentifier]: {value: enteredValue, isValid: true}
      }
  })}

  function onSubmitHandler () { 
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid){
      setInputValues(currInputs => {
        return {
          amount: {
            value: currInputs.amount.value,
            isValid: amountIsValid
          },
          date: {
            value: currInputs.date.value,
            isValid: dateIsValid
          },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid
          }
        }
      })
      return;
    }
    onSubmit(expenseData)
  }

  const formIsInvalid = !inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input 
          label={'Amount'} 
          invalid={!inputValues.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount.value
          }}
        />
        <Input 
          label={'Date'}   
          style={styles.rowInput}
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date.value
          }}
          />
      </View>
      <Input 
        label={'Description'}  
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false, // default is true
          // autoCapitalize: 'none'
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputValues.description.value
        }}
      />

      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - Please check your entered data.</Text>}
      <View style={styles.buttons}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>Cancel</Button>
        <Button onPress={onSubmitHandler} style={styles.button}>{submitButtonLabel}</Button>
      </View>
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
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },

})