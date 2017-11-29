import React from 'react'

import pieces from './unicodePieces'

const styles = {
  piece: {
    cursor: 'pointer',
    userSelect: 'none'
  }
}

const Piece = ({ onMouseDown, name, size, style }) => (
  <div
    style={{
      ...styles.piece,
      fontSize: size,
      ...style
    }}
    onMouseDown={(event) => onMouseDown(event, name)}
  >
    {pieces[name]}
  </div>
)

export default Piece
