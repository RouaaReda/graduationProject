import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import setting from './setting';
import report from './report';
import record from './record';
import welcome from './welcome';
import home from './home';
import profile from './profile';
import callhistory from './callhistory';
import recorder from './recorder'



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen name="welcome" component={welcome}/>
        <Stack.Screen name="home" component={home}/>
        <Stack.Screen name="setting" component={setting}/>
        <Stack.Screen name="profile" component={profile}/>
        <Stack.Screen name="callhistory" component={callhistory}/>
        <Stack.Screen name="report" component={report}/>
        <Stack.Screen name="recorder" component={recorder}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
