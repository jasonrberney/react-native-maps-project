import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import MapScreen from './MapScreen';
import { List, ListItem } from 'react-native-elements'
import { setMapRegion } from './redux/reducers.js'


class ListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _handlePress = (capital) => {
    const point = this.props.data.capitals.find((element) => (element.CAPITAL == capital));
    const coordinate = point.coordinate;
    console.log('coordinate', coordinate)
    this.props.dispatch(setMapRegion(coordinate));
    this.props.navigation.navigate('Map');
  }

  _sort = (a,b) => {
    if (a.STATE < b.STATE)
      return -1;
    if (a.STATE > b.STATE)
      return 1;
    return 0
  }

  render () {
    return (
      <ScrollView style={{flex: 1}}>
        <List containerStyle={{marginBottom: 20}}>
          {
            this.props.data.capitals.sort(this._sort).map((capital, i) => (
              <ListItem
                title={capital.CAPITAL}
                subtitle={capital.STATE}
                key={i}
                onPressRightIcon={() => this._handlePress(capital.CAPITAL)}
              />
            ))
          }
        </List>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(ListScreen)
