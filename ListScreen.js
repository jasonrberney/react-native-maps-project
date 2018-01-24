import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import MapScreen from './MapScreen';
import { List, ListItem } from 'react-native-elements'

class ListScreen extends React.Component {
    render () {
      console.log('list', this.props.data)
        return (
            <View>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        this.props.data.capitals.map((capital, i) => (
                            <ListItem
                                title={capital.CAPITAL}
                                key={i}
                            />
                        ))
                    }
                </List>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(ListScreen)
