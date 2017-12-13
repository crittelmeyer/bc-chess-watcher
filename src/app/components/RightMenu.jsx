import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { Drawer, RaisedButton } from 'material-ui'

import { updatePieces } from 'app/redux/actions'

import initialLayout from 'app/initialLayout'

const enhance = compose(
  connect(
    () => ({}),
    dispatch => ({
      setPieces: pieces => dispatch(updatePieces(pieces))
    })
  )
)

const styles = {
  drawer: {
    backgroundColor: 'lightgrey'
  }
}

const RightMenu = ({ onMouseDown, name, setPieces, size, style }) => (
  <Drawer openSecondary={true} open={true} containerStyle={styles.drawer}>
    <RaisedButton
      onClick={() => setPieces(initialLayout)}
    >
      {'reset'}
    </RaisedButton>
  </Drawer>
)

export default enhance(RightMenu)
