// Function is need to be in, createStore(), using thunk which is middleware so applyMiddleware() is needed

import { createStore, applyMiddleware } from 'redux';

// It will be required
import { composeWithDevTools } from 'redux-devtools-extension';

// Thunk is our middleware
import thunk from 'redux-thunk';

// root-reducer, bcz we have multiple reducers so that's why we need to combine them in root-reducer
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
