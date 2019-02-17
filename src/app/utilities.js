import flatten from 'lodash/fp/flatten'
import invert from 'lodash/fp/invert'
import join from 'lodash/fp/join'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'

export const center = {
  justifyContent: 'center',
  alignItems: 'center'
}

export const initialPlacement = [
  ['blackRook', 'blackKnight', 'blackBishop', 'blackQueen', 'blackKing', 'blackBishop', 'blackKnight', 'blackRook'],
  ['blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn'],
  ['whiteRook', 'whiteKnight', 'whiteBishop', 'whiteQueen', 'whiteKing', 'whiteBishop', 'whiteKnight', 'whiteRook']
]

export const unicodePieces = {
  whiteKing: '\u2654',
  whiteQueen: '\u2655',
  whiteRook: '\u2656',
  whiteBishop: '\u2657',
  whiteKnight: '\u2658',
  whitePawn: '\u2659',
  blackKing: '\u265A',
  blackQueen: '\u265B',
  blackRook: '\u265C',
  blackBishop: '\u265D',
  blackKnight: '\u265E',
  blackPawn: '\u265F'
}

export const fenPieces = {
  K: 'whiteKing',
  Q: 'whiteQueen',
  R: 'whiteRook',
  B: 'whiteBishop',
  N: 'whiteKnight',
  P: 'whitePawn',
  k: 'blackKing',
  q: 'blackQueen',
  r: 'blackRook',
  b: 'blackBishop',
  n: 'blackKnight', 
  p: 'blackPawn'
}

export const fenToArray = fen => {
  const [placement] = fen.split(' ')
  const ranks = placement.split('/')
  const placementArray = map(
    rank => flatten(map(
      piece => isNaN(piece) ? fenPieces[piece] : new Array(parseInt(piece, 10)).fill(''),
      rank.split('')
    )),
    ranks
  )

  return placementArray
}

export const arrayToFen = arr => {
  const fen = join(
    '/',
    map(
      rank => reduce(
        (acc, piece) => {
          if (piece === '') {
            if (acc === '' || isNaN(acc.slice(-1))) {
              return `${acc}1`
            }

            return `${acc.slice(0, acc.length - 1)}${parseInt(acc.slice(-1), 10) + 1}`
          }

          return `${acc}${invert(fenPieces)[piece]}`
        },
        '',
        rank
      ),
      arr
    )
  )

  return fen
}

export const getValidMoves = (game, sourceTile) => game.moves({ square: getPgnGridLocation(sourceTile) })

export const getPgnGridLocation = tile => `${getPgnGridFile(tile.colIndex)}${getPgnGridRank(tile.rowIndex)}`

export const getPgnGridFile = colIndex => String.fromCharCode(97 + colIndex)
export const getPgnGridRank = rowIndex => 8 - rowIndex

export const getCol = file => file.toCharCode() - 97
export const getRow = rank => rank + 8