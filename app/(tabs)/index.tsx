import Chat from '@/routes/Chat';
import LandingPage from '@/routes/LandingPage';
import Login from '@/routes/Login';
import Logon from '@/routes/Logon';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react';

export default function HomeScreen() {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
      />
      <Stack.Screen 
        name='Logon'
        component={Logon}
      />
      <Stack.Screen 
        name='Landing'
        component={LandingPage}
      />
      <Stack.Screen 
        name='Chat'
        component={Chat}
      />
    </Stack.Navigator>
  )

  
}