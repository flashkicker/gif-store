import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer'
import gifReducer from './gifReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    gifs: gifReducer
})