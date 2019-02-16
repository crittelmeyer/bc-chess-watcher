import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import Chess from 'chess.js'

import Board from 'app/components/Board'
import Clock from 'app/components/Clock'
import RightMenu from 'app/components/RightMenu'

import { selectGame } from 'app/redux/selectors'
import { updateGame } from 'app/redux/actions'
import { arrayToFen, initialPlacement } from 'app/utilities'

const styles = {
  container: {
    display: 'flex'
  }
}

const enhance = compose(
  connect(
    state => ({ game: selectGame(state) }),
    dispatch => ({ setGame: game => dispatch(updateGame(game)) })
  ),
  lifecycle({
    componentDidMount: function() {
      const game = new Chess()
  
      game.load(arrayToFen(initialPlacement))
      this.props.setGame(game)
    }
  })
)

const App = () => (
  <div style={styles.container}>
    <Board />
    <Clock />
    <RightMenu />
  </div>
)



export default enhance(App)
