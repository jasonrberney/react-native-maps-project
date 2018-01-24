import React from 'react';
import { StyleSheet, View, Button, Dimensions, TouchableOpacity, Alert, Text } from 'react-native';
import MapView from 'react-native-maps'; // 0.19.0
import { dispatch, bindActionCreators } from 'redux';
import statecapital from './assets/statecapital.png';
import {addCapital, moveCapitals, rotateCapitals, clearCapitals, setMapRegion} from './redux/reducers.js';
import { Search } from './components/SearchBar/SearchBar.js'
import {connect} from 'react-redux'
//import { MapView } from "expo";
//import { StackNavigator } from 'react-navigation';
// 1.0.0-beta.23


class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   mapRegion: { latitude: LATITUDE,
    //     longitude: LONGITUDE,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA, },
    //   markers: [],
    // };

 }
  static navigationOptions = {
    title: 'CAPITAL FINDER',
  };

  _goToUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("coords", position.coords)
        this.props.dispatch(setMapRegion(position.coords));
        // this.setState(
        //   {
        //     userLatitude: position.coords.latitude,
        //     userLongitude: position.coords.longitude,
        //   });
      }
    );
  }

  _handleMapRegionChange = mapRegion => {
    this.props.dispatch(setMapRegion(mapRegion))
  };

  componentWillUnmount() {
    this.props.dispatch(clearCapitals())
  }

  _handleButtonPress = () => {
    this.props.dispatch(moveCapitals());
  };

  _handleButtonPressRotate = () => {
    this.props.dispatch(rotateCapitals());
  };

  _handleMarkerPress(marker) {
    Alert.alert(
      // 'You selected:',
      marker.CAPITAL,
      marker.STATE,
    );
  }

  render() {
    return (
    <View style={{flex:1, flexDirection: 'column-reverse'}}>
      <MapView  
        provider={this.props.provider} 
        style={styles.map} 
        showsUserLocation={true} 
        initialRegion={this.props.data.mapRegion} onRegionChange={this._handleMapRegionChange}
      >
        {this.props.data.capitals.map(marker => (
          <MapView.Marker
            key={marker.key}
            image={statecapital}
            coordinate={marker.coordinate}
            onPress={() => this._handleMarkerPress(marker)}
            style={{transform: [{rotate: marker.hdt+'deg'}]}}
          >
            <MapView.Callout tooltip style={styles.container}>
              <View style={styles.bubble}>
                  <Text>{marker.CAPITAL}{", "}{marker.STATE}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
      <Button
        title="Move the Capitals"
        onPress={this._handleButtonPress}
        style={styles.button}
      />
      <Button
        title="Rotate the Capitals"
        onPress={this._handleButtonPressRotate}
        style={styles.button}
      />
      <Search/>
    </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(CapitalsAction, dispatch)
// } 
//

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flexWrap: 'nowrap',
    backgroundColor: '#4da2ab',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default connect(mapStateToProps)(MapScreen)
