import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HomeScreen from './HomeScreen.js' 
import MapScreen from './MapScreen.js' 
import { StackNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import capitals from './redux/reducers.js'
 // 1.0.0-beta.23

const store = createStore(capitals); 

const Nav = StackNavigator({
  Home: { screen: HomeScreen },
  Map: { screen: MapScreen },
});

const App = () => (
  <Provider store={store}>
    <Nav />
  </Provider>
)
export default App;
//AppRegistry.registerComponent('HomeScreen', () => SimpleApp);
