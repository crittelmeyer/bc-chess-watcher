export default function(state, action) {
  const { pieces } = action

  return {
    ...state,
    placement: pieces
  }
}
