import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import MapScreen from './MapScreen';
import { List, ListItem } from 'react-native-elements'

class ListScreen extends React.Component {
    render () {
        return (
            <View>
                <List containerStyle={{marginBottom: 20}}>
                    {
                        this.props.data.map((capital, i) => (
                            <ListItem
                                title={capital.CAPITAL}
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