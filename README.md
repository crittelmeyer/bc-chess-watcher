# To Do

- Refactor enhance function into own file
- Refactor coordinate calculation to be relative to chess board
- Refactor onMouseUp to occur on board, not piece
- Finish “ghost” drag-drop functionality

- Add tile ghosts to show where a piece would land and whether or not it’s able to land there
    - Smart board or smart pieces?
        - If smart board:
            - perhaps create a parent “Board” component and subcomponents for “ChessBoard” and “CheckerBoard”
            - Board passes currently dragging piece the coords of that piece and that piece passes back an array of “valid” moves, which then must be further filtered by the board since the board knows whether or not other pieces are “in the way”
        - If smart pieces:
            - Board is generic and pieces determine how the game is played
            - pieces are passed entire board state to determine where they can move
- Update board model when a piece is dropped into a valid square
- Install redux and react-redux
    - Move drag-drop state into redux
