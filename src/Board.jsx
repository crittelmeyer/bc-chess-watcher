import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import Piece from './Piece'
import Tile from './Tile'

const enhance = compose(
  withState('dragging', 'setDragging', ''),
  withState('ghostCoords', 'setGhostCoords', {}),
  withState('cursorOffset', 'setCursorOffset', {}),
  withState('sourceTile', 'setSourceTile', null),
  withState('targetTile', 'setTargetTile', null),
  withHandlers({
    onMouseDown: ({ setCursorOffset, setDragging, setGhostCoords }) => (event, pieceName) => {
      const cursorOffset = {
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop
      }
      setCursorOffset(cursorOffset)
      setGhostCoords({
        x: event.clientX - cursorOffset.x,
        y: event.clientY - cursorOffset.y,
      })
      setDragging(pieceName)
    },
    onMouseUp: ({ setDragging, setGhostCoords }) => () => {
      setDragging('')
      setGhostCoords({})
    },
    onMouseMove: ({ cursorOffset, dragging, setGhostCoords }) => (event) => {
      if (dragging) {
        setGhostCoords({
          x: event.clientX - cursorOffset.x,
          y: event.clientY - cursorOffset.y
        })
      }
    },
    onTileMouseDown: ({ setSourceTile, setTargetTile, sourceTile }) => (tile) => {
      if (sourceTile === null) {
        setSourceTile(tile)
        setTargetFile(null)
      }
    },
    onTileMouseUp: () => ({ setSourceTile, setTargetTile }) => {

    }
  })
)

const styles = {
  board: { display: 'flex' },

  ghostPiece: {
    opacity: 0.6,
    position: 'absolute',

  }
}

const Board = ({
  dragging,
  ghostCoords,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onTileMouseDown,
  onTileMouseUp,
  pieceRows
}) => (
  <div
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
  >
    {pieceRows.map((row, rowIndex) => (
      <div
        key={rowIndex}
        style={styles.board}
      >
        {row.map((piece, colIndex) => (
          <Tile
            color={(rowIndex + colIndex) % 2 === 0 ? 'red' : 'blue'}
            key={`${rowIndex}_${colIndex}`}
            onMouseDown={onTileMouseDown}
            onMouseUp={onTileMouseUp}
          >
            <Piece
              name={piece}
              size={48}
              onMouseDown={onMouseDown}
            />
          </Tile>
        ))}
      </div>
    ))}

    <Piece
      name={dragging}
      size={48}
      style={{
        ...styles.ghostPiece,
        ...dragging ? { left: ghostCoords.x, top: ghostCoords.y } : {}
      }}
    />
  </div>
)

export default enhance(Board)
