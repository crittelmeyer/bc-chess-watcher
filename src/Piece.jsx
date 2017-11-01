import React from 'react'

import pieces from './unicodePieces'

const Piece = ({ onMouseDown, onMouseUp, name, size }) => (
  <div

    style={{ fontSize: size }}
    onMouseDown={() => onMouseDown(name)}
    onMouseUp={onMouseUp}
  >
    {pieces[name]}
  </div>
)

export default Piece
