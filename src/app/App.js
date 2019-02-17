import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import Chess from 'chess.js'
import { withStyles } from '@material-ui/core/styles'

import { selectGame } from 'app/redux/selectors'
import { updateGame } from 'app/redux/actions'
import { arrayToFen, initialPlacement } from 'app/utilities'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Board from 'app/components/Board'
import ControlPanel from 'app/components/ControlPanel'
import Explorer from 'app/components/Explorer'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },

  appBar: {
    position: 'relative'
  },

  icon: {
    fontSize: 32,
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },

  content: {
    display: 'flex',
    padding: theme.spacing.unit * 2
  },

  board: {
    display: 'flex',
    flexDirection: 'column'
  }
})

const enhance = compose(
  withStyles(styles),
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

const App = ({ classes }) => (
  <div className={classes.container}>
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <div className={classes.icon}>{'\u2659'}</div>
        <Typography variant="h6" color="inherit" noWrap>
          {'Chess Openings'}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.content}>
      <div className={classes.board}>
        <Board />
        <ControlPanel />
      </div>
      <Explorer />
    </div>
  </div>
)



export default enhance(App)
