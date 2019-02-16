export default function(state, action) {
  const { move } = action
  
  return {
    ...state,
    lastMove: move
  }
}
