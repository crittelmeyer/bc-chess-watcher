import { UPDATE_PIECES } from './actions/updatePieces'
import updatePiecesReducer from './reducers/updatePiecesReducer'

import pieces from 'app/initialLayout'

const defaultState = pieces

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_PIECES:
      return updatePiecesReducer(state, action)
    default:
      return state
  }
}
