import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
// import other reducers...

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    // other reducers...
});

export default rootReducer;