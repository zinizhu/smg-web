import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import gameSchedulesReducer from '../reducers/gameSchedules';

export default () => {
    const store = createStore(
        combineReducers({
            gameSchedules: gameSchedulesReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
}
