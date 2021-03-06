import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './components/Home'
import Info from './components/Info'
import Calendar from './components/calendar'

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Info' component={Info} options={{ title: 'THE OFFICE' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator


