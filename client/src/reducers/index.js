import { combineReducers } from 'redux';
import login from "../reducers/login";
import signup from "../reducers/signup";
import user from "../reducers/user";

// Uses combineReducers to combine all the reducers
const appReducer = combineReducers({
    //Add here the different reducers
    login,
    signup,
    user
});


const rootReducer = (state, action) => appReducer(state, action);


export default rootReducer;