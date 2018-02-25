import { combineReducers } from 'redux';


// Uses combineReducers to combine all the reducers
const appReducer = combineReducers({
    //Add here the different reducers
    // For example
    // auth,
});


const rootReducer = (state, action) => appReducer(state, action);


export default rootReducer;