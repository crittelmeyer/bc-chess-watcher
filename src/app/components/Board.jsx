import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import Piece from './Piece'
import Tile from './Tile'

import { selectPieces } from 'app/redux/selectors'
import { updatePieces } from 'app/redux/actions'

const enhance = compose(
  connect(
    state => ({
      pieces: selectPieces(state)
    }),
    dispatch => ({
      setPieces: pieces => dispatch(updatePieces(pieces))
    })
  ),
  withState('dragging', 'setDragging', ''),
  withState('ghostCoords', 'setGhostCoords', {}),
  withState('cursorOffset', 'setCursorOffset', {}),
  withState('sourceTile', 'setSourceTile', null),
  withHandlers({
    onPieceMouseDown: ({ setCursorOffset, setDragging, setGhostCoords }) => (event, pieceName) => {
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
    onBoardMouseUp: ({ setDragging, setGhostCoords }) => () => {
      setDragging('')
      setGhostCoords({})
    },
    onBoardMouseMove: ({ cursorOffset, dragging, setGhostCoords }) => (event) => {
      if (dragging) {
        setGhostCoords({
          x: event.clientX - cursorOffset.x,
          y: event.clientY - cursorOffset.y
        })
      }
    },
    onTileMouseDown: ({ setSourceTile, sourceTile }) => (rowIndex, colIndex) => {
      if (sourceTile === null) {
        setSourceTile({ rowIndex, colIndex })
      }
    },
    onTileMouseUp: ({ setSourceTile, sourceTile }) => (rowIndex, colIndex) => {
      setSourceTile(null)

    }
  })
)

const styles = {
  board: { display: 'flex' },

  ghostPiece: {
    opacity: 0.6,
    pointerEvents: 'none',
    position: 'absolute'
  }
}

const Board = ({
  dragging,
  ghostCoords,
  onBoardMouseUp,
  onBoardMouseMove,
  onPieceMouseDown,
  onTileMouseDown,
  onTileMouseUp,
  pieces
}) => (
  <div
    onMouseMove={onBoardMouseMove}
    onMouseUp={onBoardMouseUp}
  >
    {pieces.map((row, rowIndex) => (
      <div
        key={rowIndex}
        style={styles.board}
      >
        {row.map((piece, colIndex) => (
          <Tile
            color={(rowIndex + colIndex) % 2 === 0 ? 'red' : 'blue'}
            key={`${rowIndex}_${colIndex}`}
            onMouseDown={() => { onTileMouseDown(rowIndex, colIndex) }}
            onMouseUp={() => { onTileMouseUp(rowIndex, colIndex) }}
          >
            <Piece
              name={piece}
              size={48}
              onMouseDown={onPieceMouseDown}
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
