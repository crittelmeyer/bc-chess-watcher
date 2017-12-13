import React from 'react'

import Board from 'app/components/Board'
import RightMenu from 'app/components/RightMenu'

const styles = {
  container: {
    display: 'flex'
  }
}

const App = () => (
  <div style={styles.container}>
    <Board />
    <RightMenu />
  </div>
)



export default App
