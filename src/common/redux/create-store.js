
import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from './promise-middleware'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)
const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
const store = finalCreateStore(reducer)

export default store;
