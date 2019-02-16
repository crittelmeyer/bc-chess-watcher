import { call, put, select, takeEvery } from 'redux-saga/effects'

import { selectGame } from 'app/redux/selectors'
import { fenToArray, getPgnGridLocation } from 'app/utilities'

function* updateGame(action) {
  const game = yield select(selectGame)
  const { source, target } = action.move
  
  yield call (
    game.move,
    {
      from: getPgnGridLocation(source),
      to: getPgnGridLocation(target)
    }
  )
  yield put({type: 'UPDATE_GAME', game })
}

function* updatePieces() {
  const game = yield select(selectGame)
  const pieces = fenToArray(game.fen())

  yield put({ type: 'UPDATE_PIECES', pieces })
}

function* rootSaga() {
  yield takeEvery('MOVE_PIECE', updateGame)
  yield takeEvery('UPDATE_GAME', updatePieces)
}

export default rootSaga