import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DebtorsCalendar from './src/screens/DebtorsCalendar';
import DebtorDetailsScreen from './src/screens/DebtorDetails';
import AllDebtors from './src/screens/AllDebtors';

// Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  headerStyle: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: '#252525',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 20,
    color: '#252525',
    fontFamily: 'Poppins-Medium',
  },
  headerShown: false,
};

// ---------- Tab Stacks ----------
const DashboardStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Dashboard" component={HomeScreen} />
  </Stack.Navigator>
);

const CalendarStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Calendar" component={DebtorsCalendar} />
  </Stack.Navigator>
);

const DebtorsStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="Debtors"
      component={AllDebtors}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DebtorDetails"
      component={DebtorDetailsScreen}
      options={({route}) => ({
        title: route.params.debtorName,
      })}
    />
  </Stack.Navigator>
);


// ---------- Bottom Tabs ----------
const BottomTabs = () => (
  <Tab.Navigator screenOptions={{tabBarStyle: {backgroundColor: '#fff'}}}>
    <Tab.Screen
      name="DashboardTab"
      component={DashboardStack}
      options={{title: 'Dashboard'}}
    />
    <Tab.Screen
      name="CalendarTab"
      component={CalendarStack}
      options={{title: 'Calendar'}}
    />
    <Tab.Screen
      name="DebtorsTab"
      component={DebtorsStack}
      options={{
        title: 'Debtors',
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

// ---------- Root Navigator ----------
const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={BottomTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
