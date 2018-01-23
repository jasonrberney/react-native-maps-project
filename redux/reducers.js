const ADD_CAPITAL = 'ADD_CAPITAL';
const MOVE_CAPITALS = 'MOVE_CAPITALS';
const ROTATE_CAPITALS = 'ROTATE_CAPITALS';
const CLEAR_CAPITALS = 'CLEAR_CAPITALS';


const initialCapitalState = {
  key: 60,
  STATE: 'test',
  CAPITAL: 'test',
  coordinate: {
    latitude: 47.122,
    longitude: -122
  }
}

const initialCapitalsState = [];

export function addCapital (item = initialCapitalState) {
  return {
    type: ADD_CAPITAL,
    item
  }
}

export function moveCapitals () {
  return {
    type: MOVE_CAPITALS
  }
}

export function rotateCapitals () {
  return {
    type: ROTATE_CAPITALS
  }
}

export function clearCapitals () {
  return {
    type: CLEAR_CAPITALS
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
          },
          hdt: 0
        }
      ]
    case MOVE_CAPITALS:
      let moveCapitals = state.map(point => (
        {
          ...point,
          coordinate: {latitude: point.coordinate.latitude + 5, longitude: point.coordinate.longitude + 5}
        }
      ))
      return [ ...moveCapitals ]
    case ROTATE_CAPITALS:
      let rotateCapitals = state.map(point => (
        {
          ...point,
          hdt: point.hdt + 45
        }
      ))
      return [ ...rotateCapitals ]
    case CLEAR_CAPITALS:
      return initialCapitalsState
    default:
      return state
  }
}

