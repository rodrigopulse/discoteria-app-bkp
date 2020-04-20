import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StatusBar,
} from 'react-native';
//Views
import Login from './src/views/Login';
import CriarConta from './src/views/CriarConta';
import Colecao from './src/views/Colecao';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator  initialRouteName='CriarConta' headerMode="null">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CriarConta" component={CriarConta} />
            <Stack.Screen name="Colecao" component={Colecao} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};

export default App;
