import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StatusBar,
} from 'react-native';
//Views
import Login from './src/views/Login';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator  initialRouteName='Login' headerMode="null">
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};

export default App;
