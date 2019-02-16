import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'

import { Drawer, RaisedButton, TextField } from 'material-ui'

import { updateGame, updatePieces } from 'app/redux/actions'
import { fenToArray, initialPlacement } from 'app/utilities'

const enhance = compose(
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

const styles = {
  drawer: {
    backgroundColor: 'lightgrey'
  }
}

const RightMenu = ({ fen, onFenChange, onSetFenClick, setPieces }) => (
  <Drawer openSecondary={true} open={true} containerStyle={styles.drawer}>
    <RaisedButton
      onClick={() => setPieces(initialPlacement)}
    >
      {'reset'}
    </RaisedButton>
    <TextField id="fen" value={fen} onChange={onFenChange}></TextField>
    <RaisedButton
      onClick={onSetFenClick}
    >
      {'set fen'}
    </RaisedButton>
  </Drawer>
)

export default enhance(RightMenu)
