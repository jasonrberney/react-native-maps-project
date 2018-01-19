import React from 'react'
import { SearchBar } from 'react-native-elements'

export function Search () {
    return (
        <SearchBar
            lightTheme
            onChangeText={someMethod}
            onClearText={someMethod}
            placeholder='Type Here...'
        />
    )
}
