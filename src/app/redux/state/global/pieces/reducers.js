import { UPDATE_PIECES } from './actions/updatePieces'
import { MOVE_PIECE } from './actions/movePiece'
import updatePiecesReducer from './reducers/updatePiecesReducer'
import movePieceReducer from './reducers/movePieceReducer'

import { initialPlacement } from 'app/utilities'

const defaultState = {
  lastMove: {},
  placement: initialPlacement
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_PIECES:
      return updatePiecesReducer(state, action)
    case MOVE_PIECE:
      return movePieceReducer(state, action)
    default:
      return state
  }
}
