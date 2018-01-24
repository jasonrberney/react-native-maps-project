import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
//import { StackNavigator } from 'react-navigation';
 // 1.0.0-beta.23

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Home Screen',
  };
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

