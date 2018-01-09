import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HomeScreen from './HomeScreen.js' 
import MapScreen from './MapScreen.js' 
import { StackNavigator } from 'react-navigation';
 // 1.0.0-beta.23

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Map: { screen: MapScreen },
});

export default App;
//AppRegistry.registerComponent('HomeScreen', () => SimpleApp);
