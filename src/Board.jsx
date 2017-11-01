import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import Piece from './Piece'
import Tile from './Tile'

const enhance = compose(
  withState('dragging', 'setDragging', ''),
  withState('ghostCoords', 'setGhostCoords', {}),
  withHandlers({
    onMouseDown: ({ setDragging }) => (pieceName) => {
      setDragging(pieceName)
    },
    onMouseUp: ({ setDragging, setGhostCoords }) => () => {
      setDragging('')
      setGhostCoords({})
    },
    onMouseMove: ({ dragging, setGhostCoords }) => (event) => {
      if (dragging) {
        setGhostCoords({
          x: event.clientX,
          y: event.clientY
        })
      }
    }
  })
)

const styles = {
  board: { display: 'flex' }
}

const Board = ({ dragging, ghostCoords, onMouseDown, onMouseUp, onMouseMove, pieceRows }) => (

  <div onMouseMove={onMouseMove}>
    <div>{dragging.toString()}</div>
    <div>{ghostCoords.x && ghostCoords.x.toString()}</div>
    <div>{ghostCoords.y && ghostCoords.y.toString()}</div>
    {pieceRows.map((row, rowIndex) => (
      <div
        key={rowIndex}
        style={styles.board}
      >
        {row.map((piece, colIndex) => (
          <Tile
            color={(rowIndex + colIndex) % 2 === 0 ? 'red' : 'blue'}
            key={`${rowIndex}_${colIndex}`}
          >
            <Piece
              name={piece}
              size={48}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            />
          </Tile>
        ))}
      </div>
    ))}
  </div>
)

export default enhance(Board)
