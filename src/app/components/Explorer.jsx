import React from 'react'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import find from 'lodash/fp/find'
import get from 'lodash/fp/get'
import isFunction from 'lodash/fp/isFunction'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import grey from '@material-ui/core/colors/grey'

import { selectGame, selectLastMove } from 'app/redux/selectors'
import eco from 'app/eco.json'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import MoveAnalysisChart from 'app/components/MoveAnalysisChart'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 800,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 4}px 0`,
  },
  lineTree: {
    border: `solid ${grey[500]} 1px`,
    height: 200
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  innerCardGrid: {
    justifyContent: 'center',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardIcon: {
    alignSelf: 'center',
    fontSize: 64
  }
})

const enhance = compose(
  withStyles(styles),
  connect(
    state => ({
      game: selectGame(state),
      lastMove: selectLastMove(state)
    })
  ),
  withPropsOnChange(
    ['lastMove'],
    ({ game }) => ({
      name: get(
        'n',
        find(
          match => isFunction(game.fen) && game.fen().indexOf(match.f) > -1,
          eco
        )
      ),
      
    })
  )
)

const cards = [{ id: 1, move: 'Nf3' }, { id: 2, move: 'f4' }, { id: 3, move: 'd4' }]

const Explorer = ({ classes, game, name }) => (
  <div className={classes.container}>
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {name}
        </Typography>
        <div className={classes.lineTree}>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            {isFunction(game.pgn) && game.pgn()}
          </Typography>
        </div>
      </div>
    </div>
    <div className={classNames(classes.layout, classes.cardGrid)}>
      <Grid className={classes.innerCardGrid} container spacing={40}>
        {cards.map(card => (
          <Grid item key={card.id} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardIcon}>
                {'\u2659'}
              </CardContent>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.move}
                </Typography>
                <MoveAnalysisChart move={card.move} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
)

export default enhance(Explorer)
