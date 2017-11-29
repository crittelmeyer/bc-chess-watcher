import { combineReducers } from 'redux'
import pieces from './pieces/reducers'

export const reducers = combineReducers({
  pieces
})
export * from './pieces/reducers'
