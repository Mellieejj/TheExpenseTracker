import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';

const BottomTab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

function ExpensesOverview() {
  return(
    <BottomTab.Navigator>
      <BottomTab.Screen name="AllExpenses" component={AllExpenses} />
      <BottomTab.Screen name="RecentExpenses" component={RecentExpenses} />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
          <Stack.Screen name="ManageExpense" component={ManageExpense}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
    
  );
}

