import { combineReducers } from 'redux'
import game from './game/reducers'
import pieces from './pieces/reducers'

export const reducers = combineReducers({
  game,
  pieces
})
export * from './game/reducers'
export * from './pieces/reducers'
