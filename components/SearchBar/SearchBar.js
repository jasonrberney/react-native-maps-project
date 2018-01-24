import React from 'react'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import { dispatch } from 'redux'
import { setMapRegion } from '../../redux/reducers';

class MapSearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    _onSubmitEditing = (text) => {
        const cap = this.props.data.capitals.find((capitalState) => (capitalState ? capitalState.STATE == text : null))
        if (cap == null) {
            Alert.alert(`${text} is not a state!`);
        }
        else {
            const coordinate = cap.coordinate;
            this.props.dispatch(setMapRegion(coordinate));
            console.log('coordinate', coordinate)
        }
        this.search.clearText();
    }

    _onChangeText(text) {
        console.log(text);
    }

    render() {
        return (
            <SearchBar
                ref={search => this.search = search}
                lightTheme
                onChangeText={this._onChangeText}
                onSubmitEditing={(event) => this._onSubmitEditing( event.nativeEvent.text )}
                // onClearText={someMethod}
                placeholder='Enter a State here...'
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(MapSearchBar)
