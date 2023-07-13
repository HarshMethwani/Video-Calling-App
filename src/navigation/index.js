import { View, Text } from 'react-native'
import React from 'react'
import ContactScreens from '../screens/contactScreens'
import CallScreen from '../screens/callScreen'
import CallingScreen from '../screens/callingScreen'
import IncomingCallScreen from '../screens/incomingCallScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
         <Stack.Screen
          name="Login"
          component = {LoginScreen}
          />
          <Stack.Screen
          name="Contacts"
          component = {ContactScreens}
          />
          
          <Stack.Group screenOptions={{headerShown:false}}>
          <Stack.Screen
          name="Call"
          component = {CallScreen}
          />
          <Stack.Screen
          name="Calling"
          component = {CallingScreen}
          />
          <Stack.Screen
          name="Incoming Call"
          component = {IncomingCallScreen}
          />
          </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;