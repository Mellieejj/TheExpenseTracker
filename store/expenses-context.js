import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
    // {
    //   id: 'e1',
    //   description: 'Schoenen',
    //   amount: 59.99,
    //   date: new Date('2022-07-31')
    // },
    // {
    //   id: 'e2',
    //   description: 'Keepershandschoenen',
    //   amount: 49.99,
    //   date: new Date('2022-06-30')
    // },
    // {
    //   id: 'e3',
    //   description: 'Mario Kart',
    //   amount: 19.99,
    //   date: new Date('2022-07-29')
    // },
    // {
    //   id: 'e4',
    //   description: 'Sleutelhanger',
    //   amount: 9.99,
    //   date: new Date('2022-07-20')
    // },
    // {
    //   id: 'e5',
    //   description: 'boek',
    //   amount: 18.95,
    //   date: new Date('2022-02-22')
    // },
    // {
    //   id: 'e6',
    //   description: 'Tas',
    //   amount: 59.99,
    //   date: new Date('2022-07-31')
    // },
    // {
    //   id: 'e7',
    //   description: 'Peren',
    //   amount: 49.99,
    //   date: new Date('2022-06-30')
    // },
    // {
    //   id: 'e8',
    //   description: 'Cola, Fanta, Casis',
    //   amount: 19.99,
    //   date: new Date('2022-07-29')
    // },
    // {
    //   id: 'e9',
    //   description: 'Lamp',
    //   amount: 9.99,
    //   date: new Date('2022-07-20')
    // },
    // {
    //   id: 'e10',
    //   description: 'De Crew missie Diepzee',
    //   amount: 18.95,
    //   date: new Date('2022-02-22')
    // }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date})=> {}
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [
                ...state,
                {...action.payload, id: id}
            ]; 
            break;
        case 'UPDATE':
            const updateExpenseIndex = state.findIndex(item => item.id === action.payload.id);
            const updatableExpense = state[updateExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state]
            updatedExpenses[updateExpenseIndex] = updatedItem;

            return updatedExpenses; 
            break;
        case 'DELETE':
            return state.filter(item => item.id !== action.payload);
            break;
        default:
            return state;
    }
}

function ExpensesContextProvider ({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({
            type: 'ADD', 
            payload: expenseData
        })
    }

    function deleteExpense(id){
        dispatch({
            type: 'DELETE',
            payload: id
        })
    }

    function updateExpense(id, expenseData){
        dispatch({
            type: 'UPDATE',
            payload: {
                id: id, 
                data: expenseData
            }
        })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
 }

 export default ExpensesContextProvider;