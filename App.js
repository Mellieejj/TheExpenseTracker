import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IconButton from './components/ui/IconButton';
import { GlobalStyles } from './constants/styles';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import ExpensesContextProvider from './store/expenses-context';

const BottomTab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

function ExpensesOverview() {
  return(
    <BottomTab.Navigator
      screenOptions={({navigation}) => {
        return ({
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({tintColor}) => <IconButton 
                                          iconName="add" 
                                          iconSize={24} 
                                          iconColor={tintColor} 
                                          onPress={() => {
                                            navigation.navigate('ManageExpense')
                                          }} 
                                        /> 
        })
      }}
    >
      <BottomTab.Screen 
        name="RecentExpenses" 
        component={RecentExpenses} 
        options={{
          title: "Recent Expenses",
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color} />
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator 
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',

          }}>
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ExpensesOverview} 
              options={{
                headerShown: false
              }} 
            />
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpense}
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

