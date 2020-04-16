import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StatusBar,
} from 'react-native';
//Views
import Login from './src/views/Login';
import CriarConta from './src/views/CriarConta';
import Home from './src/views/Home';

const Stack = createStackNavigator();

class App extends Component {
  state = {
    logado: ''
  }
  verificaToken = async () => {
    try {
      await AsyncStorage.getItem('@MaisClorofilaApp:token')
      this.setState({
        logado: true
      })
    }
    catch(error) {
      this.setState({
        logado: false
      })
    }
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator  initialRouteName={this.state.logado ? 'Home' : 'Login'} headerMode="null">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CriarConta" component={CriarConta} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};

export default App;
