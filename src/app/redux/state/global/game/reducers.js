import { UPDATE_GAME } from './actions/updateGame'
import updateGameReducer from './reducers/updateGameReducer'

const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_GAME:
      return updateGameReducer(state, action)
    default:
      return state
  }
}
