import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomeScreen from '../screens/HomeScreen';
import AddReminderScreen from '../screens/AddReminderScreen';
import EditReminderScreen from '../screens/EditReminderScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />
        <Stack.Screen name="EditReminder" component={EditReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
