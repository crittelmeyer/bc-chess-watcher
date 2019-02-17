import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { updateGame, updatePieces } from 'app/redux/actions'
import { fenToArray, initialPlacement } from 'app/utilities'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = {
  
}

const enhance = compose(
  withStyles(styles),
  connect(
    () => ({}),
    dispatch => ({
      setGame: game => dispatch(updateGame(game)),
      setPieces: pieces => dispatch(updatePieces(pieces))
    })
  ),
  withState('fen', 'setFen', ''),
  withHandlers({
    onFenChange: ({ setFen }) => (_, value) => {
      setFen(value)
    },
    onSetFenClick: ({ fen, game, setGame, setPieces }) => () => {
      setPieces(fenToArray(fen))

      game.load(fen)
      setGame(game)
    }
  })
)

const ControlPanel = ({ fen, onFenChange, onSetFenClick, setPieces }) => (
  <div>
    <Button
      onClick={() => setPieces(initialPlacement)}
    >
      {'reset'}
    </Button>
    <TextField id="fen" value={fen} onChange={onFenChange}></TextField>
    <Button
      onClick={onSetFenClick}
    >
      {'set fen'}
    </Button>
  </div>
)

export default enhance(ControlPanel)
