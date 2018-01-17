import axios from 'axios'

export function getCapitals () {
    return axios.get('https://raw.githubusercontent.com/jasonrberney/react-native-maps-project/master/data/capitals.json')
        .then(function (json){
            return json.data
        })
}