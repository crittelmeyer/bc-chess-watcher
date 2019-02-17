import React from 'react'
import { compose, lifecycle, withState, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import isFunction from 'lodash/fp/isFunction'

import { selectGame } from 'app/redux/selectors'
import { center } from 'app/utilities'

const msToTime = duration => {
  const seconds = parseInt((duration / 1000) % 60).toString().padStart(2, '0')
  const minutes = parseInt((duration / (1000 * 60)) % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}

const enhance = compose(
  connect(
    state => ({
      game: selectGame(state),
    })
  ),
  withState('bottomMs', 'setBottomMs', 0),
  withState('lastTick', 'setLastTick', 0),
  withState('timer', 'setTimer', null),
  withState('topMs', 'setTopMs', 0),
  withPropsOnChange(
    ['bottomMs'],
    ({ bottomMs }) => ({
      bottomTime: msToTime(bottomMs)
    })
  ),
  withPropsOnChange(
    ['topMs'],
    ({ topMs }) => ({
      topTime: msToTime(topMs)
    })
  ),
  lifecycle({
    componentDidMount: function() {
      this.props.setLastTick(Date.now())

      this.props.setTimer(
        setInterval(
          () => {
            if (!isFunction(this.props.game.turn) || this.props.game.turn() === 'w') {
              this.props.setBottomMs(this.props.bottomMs + (Date.now() - this.props.lastTick))
            } else {
              this.props.setTopMs(this.props.topMs + (Date.now() - this.props.lastTick))
            }
            this.props.setLastTick(Date.now())
          },
          1
        )
      )
    },
    componentWillUnmount: function() {
      clearInterval(this.props.timere)
    }
  })
)


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 32,
    width: 100,
    ...center
  },

  clock: {
    border: 'solid black 1px',
    display: 'flex',
    flexDirection: 'column',
    padding: 32,
    ...center
  },

  light: {
    border: 'solid black 1px',
    borderRadius: 100,
    height: 10,
    width: 10
  },

  lightOn: {
    backgroundColor: '#00ff00',
    borderColor: '#66ff66',
    boxShadow: '0 0 120px -4px rgba(5, 250, 83, 0.79)'
  }
}

const Clock = ({ bottomTime, game, topTime }) => (
  <div style={styles.container}>
    <div style={styles.clock}>
      {topTime}
      <div
        style={{
          ...styles.light,
          ...isFunction(game.turn) && game.turn() === 'b' && styles.lightOn
        }}
      ></div>
    </div>
    <div style={styles.clock}>
      {bottomTime}
      <div
        style={{
        ...styles.light,
        ...!isFunction(game.turn) || game.turn() === 'w' && styles.lightOn
        }}
      ></div>
    </div>
  </div>
)

export default enhance(Clock)
