const ADD_CAPITAL = 'ADD_CAPITAL';


const initialCapitalState = {
  key: 60,
  STATE: 'test',
  CAPITAL: 'test',
  coordinate: {
    latitude: 47.122,
    longitude: -122
  }
}

const initialCapitalsState = [initialCapitalState];

export function addCapital (item = initialCapitalState) {
  return {
    type: ADD_CAPITAL,
    item
  }
}

export default function capitals (state = initialCapitalsState, action) {
  switch(action.type) {
    case ADD_CAPITAL:
      return [
        ...state,
        {
          key: action.item.key,
          STATE: action.item.STATE,
          CAPITAL: action.item.CAPITAL,
          coordinate: {
            latitude: action.item.LATITUDE,
            longitude: action.item.LONGITUDE
          }
        }
      ]
    default:
      return state
  }
}

