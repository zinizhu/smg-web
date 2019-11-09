import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import gameSchedulesReducer from '../reducers/gameSchedules';
import authenticationReducer from '../reducers/authentication';

export default () => {
    const store = createStore(
        combineReducers({
            gameSchedules: gameSchedulesReducer,
            authentication: authenticationReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
}
