import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StatusBar,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import { Provider } from 'react-redux';
import store from './src/store';

//Views
import Login from './src/views/Login';
import CriarConta from './src/views/CriarConta';
import Colecao from './src/views/Colecao';
import Disco from './src/views/Disco';
import Busca from './src/views/Busca';
import AdicionarDisco1 from './src/views/AdicionarDisco/AdicionarDisco1';
import AdicionarDisco2 from './src/views/AdicionarDisco/AdicionarDisco2';
import AdicionarArtista from './src/views/AdicionarArtista';
//Components
import Carregando from './src/components/Carregando';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    OneSignal.init("66e4bf9a-ba43-4222-be66-b0b9e7491586", {kOSSettingsKeyAutoPrompt : false});
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Provider store = { store }>
          <Carregando />
          <NavigationContainer>
            <Stack.Navigator initialRouteName='CriarConta' headerMode="null">
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="CriarConta" component={CriarConta} />
              <Stack.Screen name="Colecao" component={Colecao} />
              <Stack.Screen name="Disco" component={Disco} />
              <Stack.Screen name="Busca" component={Busca} />
              <Stack.Screen name="AdicionarDisco1" component={AdicionarDisco1} />
              <Stack.Screen name="AdicionarDisco2" component={AdicionarDisco2} />
              <Stack.Screen name="AdicionarArtista" component={AdicionarArtista} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </>
    );
  }
};
export default App;
