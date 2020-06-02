// This is a reducer
// Function which takes state that needs to do with alert
// Dispatch event
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
