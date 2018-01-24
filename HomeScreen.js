import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { getCapitals } from './helpers/dataLoader'
import {addCapital} from './redux/reducers.js'
import { dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
