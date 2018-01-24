import React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import { getCapitals } from './helpers/dataLoader'
import {addCapital} from './redux/reducers.js'
import { dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setMapRegion} from './redux/reducers.js'
//import { StackNavigator } from 'react-navigation';
// 1.0.0-beta.23

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Home Screen',
  };

  componentDidMount() {
    let test = getCapitals()
    .then((data) => {
      data.map(capital => (this.props.dispatch(addCapital(capital))))
    })
    .catch((error) => {console.log(error)}); // .bind(this) would go in between curly and paren if it wasn't arrow function

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE = 47.6062;
    const LONGITUDE = -122.3321;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    let mapRegion = { 
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA 
    }
    this.props.dispatch(setMapRegion(mapRegion))

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Button
      title="Find some capitals"
      onPress={() =>
        navigate('Map')
      }
      />
      <Button
      title="List some capitals"
      onPress={() =>
        navigate('List')
      }
      />
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(HomeScreen)
