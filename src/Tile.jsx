import React from 'react'

import { center } from './utilities'

const TILE_SIZE = 80

const Tile = ({ children, color, onMouseDown, onMouseUp }) => (
  <div
    style={{
      backgroundColor: color,
      cursor: 'default',
      display: 'flex',
      height: TILE_SIZE,
      width: TILE_SIZE,
      ...center
    }}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  >
    {children}
  </div>
)

export default Tile
