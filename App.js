import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StatusBar,
} from 'react-native';
//Views
import Login from './src/views/Login';
import CriarConta from './src/views/CriarConta';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator  initialRouteName='Login' headerMode="null">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CriarConta" component={CriarConta} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};

export default App;
