const ADD_CAPITAL = 'ADD_CAPITAL';
const MOVE_CAPITALS = 'MOVE_CAPITALS';
const ROTATE_CAPITALS = 'ROTATE_CAPITALS';
const CLEAR_CAPITALS = 'CLEAR_CAPITALS';
const SET_MAP_REGION = 'SET_MAP_REGION';


const initialCapitalsState = {
  capitals: [], 
  mapRegion: {
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null
  }
};

export function setMapRegion (coordinate) {
  return {
    type: SET_MAP_REGION,
    coordinate
  }
}

export function addCapital (item) {
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
      return { 
        ...state,
        capitals: [
          ...state.capitals,
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
    }
    case MOVE_CAPITALS:
      let moveCapitals = state.capitals.map(point => (
        {
          ...point,
          coordinate: {latitude: point.coordinate.latitude + 5, longitude: point.coordinate.longitude + 5}
        }
      ))
      return {
        ...state,
        capitals: [ ...moveCapitals ]
      }
    case ROTATE_CAPITALS:
      let rotateCapitals = state.capitals.map(point => (
        {
          ...point,
          hdt: point.hdt + 45
        }
      ))
      return {
        ...state,
        capitals: [ ...rotateCapitals ]
      }
    case CLEAR_CAPITALS:
      return  {
        ...initialCapitalsState,
        mapRegion: state.mapRegion
      }
    case SET_MAP_REGION:
      return {
        ...state,
        mapRegion: {
          ...state.mapRegion,
          ...action.coordinate
        }
      }
    default:
      return state
  }
}

