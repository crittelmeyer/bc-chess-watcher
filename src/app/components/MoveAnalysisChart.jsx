import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { updateGame, updatePieces } from 'app/redux/actions'
import { center, fenToArray, initialPlacement } from 'app/utilities'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const styles = {
  container: {
    backgroundColor: 'lightgrey',
    width: '100%',
    display: 'flex',
    ...center
  }
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

const MoveAnalysisChart = ({ classes }) => (
  <div>
    {'chart here'} 
  </div>
)

export default enhance(MoveAnalysisChart)
