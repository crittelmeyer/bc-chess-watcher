export const MOVE_PIECE = 'MOVE_PIECE'

export function movePiece(move) {
  return { type: MOVE_PIECE, move }
}
