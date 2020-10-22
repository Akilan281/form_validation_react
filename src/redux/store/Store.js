import { createStore, combineReducers } from 'redux'

import FormReducerComponent from '../reducer/FormReducerComponent'

const appreducer = combineReducers({
    FormReducerComponent
})

const store = createStore(appreducer, {})

export default store;