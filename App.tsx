import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import welcome from './welcome'; // Capitalized component name
import home from './home'; // Capitalized component name
import setting from './setting';
import callhistory from './callhistory';
import profile from './profile';
import report from './report';

const Stack = createStackNavigator();

export default function App() {
  const ishome=false
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen name="welcome" component={welcome}/>
        <Stack.Screen name="home" component={home}/>
        <Stack.Screen name="setting" component={setting}/>
        <Stack.Screen name="callhistory" component={callhistory}/>
        <Stack.Screen name="profile" component={profile}/>
        <Stack.Screen name="report" component={report}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
