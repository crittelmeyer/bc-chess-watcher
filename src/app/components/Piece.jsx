import React from 'react'

import { unicodePieces } from 'app/utilities'

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
    {unicodePieces[name]}
  </div>
)

export default Piece
