import React from 'react';
import { StyleSheet, View, Button, Dimensions, TouchableOpacity, Alert, Text } from 'react-native';
import MapView from 'react-native-maps'; // 0.19.0
import "prop-types"; // Supported builtin module
import { dispatch, bindActionCreators } from 'redux';
import { getCapitals } from './helpers/dataLoader'
import statecapital from './assets/statecapital.png'
import {addCapital, moveCapitals, rotateCapitals} from './redux/reducers.js'
import { Search } from './components/SearchBar/SearchBar.js'
import {connect} from 'react-redux'
//import { MapView } from "expo";
//import { StackNavigator } from 'react-navigation';
// 1.0.0-beta.23

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 47.6062;
const LONGITUDE = -122.3321;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: { latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA, },
      markers: [],
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState(
          {
            userLatitude: position.coords.latitude,
            userLongitude: position.coords.longitude,
          });
      },
    );
  }
  static navigationOptions = {
    title: 'CAPITAL FINDER',
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  componentDidMount() {
    let test = getCapitals()
      .then((data) => {
        data.map(captial => (this.props.dispatch(addCapital(captial))))
      }); // .bind(this) would go in between curly and paren if it wasn't arrow function
      this.props.dispatch(addCapital(
        {
          key: 80,
          STATE: 'test2',
          CAPITAL: 'test2',
          LATITUDE: 47.122,
          LONGITUDE: -122
        }
    ))
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
    console.log(this)
    return (
    <View style={{flex:1, flexDirection: 'column-reverse'}}>
      <MapView  
        provider={this.props.provider} 
        style={styles.map} 
        showsUserLocation={true} 
        initialRegion={this.state.mapRegion} onRegionChange={this._handleMapRegionChange}
      >
        {this.props.data.map(marker => (
          <MapView.Marker
            key={marker.key}
            image={statecapital}
            coordinate={marker.coordinate}
            onPress={() => this._handleMarkerPress(marker)}
            style={{transform: [{rotate: '45deg'}]}}
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

MapScreen.propTypes = {
  provider: MapView.ProviderPropType,
};

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
