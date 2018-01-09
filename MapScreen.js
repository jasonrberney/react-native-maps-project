import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
//import MapView from 'react-native-maps'; // 0.19.0
import "prop-types"; // Supported builtin module
import { MapView } from "expo";
//import { StackNavigator } from 'react-navigation';
// 1.0.0-beta.23

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
      
      <MapView
        style={{ height: 400, width: 400 }}
        region={this.state.mapRegion}
        onRegionChange={this._handleMapRegionChange}
      />
      
    );
  }
}

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 150,
//     length: 150,
//   },
// });