import React from 'react'
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose'
import { connect } from 'react-redux'
import forEach from 'lodash/fp/forEach'

import Piece from './Piece'
import Tile from './Tile'

import { selectGame, selectPieces } from 'app/redux/selectors'
import { movePiece } from 'app/redux/actions'
import { getPgnGridLocation, getValidMoves } from 'app/utilities'

const enhance = compose(
  connect(
    state => ({
      game: selectGame(state),
      pieces: selectPieces(state)
    }),
    dispatch => ({
      movePiece: (piece, source, target) => dispatch(movePiece({ piece, source, target }))
    })
  ),
  withState('dragging', 'setDragging', ''),
  withState('ghostCoords', 'setGhostCoords', {}),
  withState('cursorOffset', 'setCursorOffset', {}),
  withState('sourceTile', 'setSourceTile', null),
  withPropsOnChange(
    ['dragging'],
    ({ dragging, game, sourceTile }) => ({
      validMoves: dragging === '' ? [] : getValidMoves(game, sourceTile)
    })
  ),
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
    onTileMouseUp: props => (rowIndex, colIndex) => {
      const { dragging, setSourceTile, sourceTile } = props

      props.movePiece(dragging, sourceTile, { rowIndex, colIndex })

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

const getTileColor = (validMoves, colIndex, rowIndex) => {
  let color = (rowIndex + colIndex) % 2 === 0 ? 'lightgrey' : 'grey'

  forEach(
    move => {
      const isAttack = move.indexOf('x') > -1
      const isCheck = move.slice(-1) === '+'
      const target = isCheck ? move.slice(-3).slice(0, 2) : move.slice(-2)
      
      if (target === getPgnGridLocation({ colIndex, rowIndex })) {
        if (isCheck) {
          color = 'green'
        } else if (isAttack) {
          color = 'red'
        } else {
          color = 'yellow'
        }
      }
    },
    validMoves
  )

  return color
}

const Board = ({
  dragging,
  ghostCoords,
  onBoardMouseUp,
  onBoardMouseMove,
  onPieceMouseDown,
  onTileMouseDown,
  onTileMouseUp,
  pieces,
  validMoves
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
            color={getTileColor(validMoves, colIndex, rowIndex)}
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
