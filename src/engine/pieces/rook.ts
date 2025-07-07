import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = []
        let currentSquare = board.findPiece(this)

        for (let index = 0; index < 8; index++) {
            // Horizontal moves
            if (index != currentSquare.col) {
                availableMoves.push(new Square(currentSquare.row, index))
            }

            // Vertical moves
            if (index != currentSquare.row) {
                availableMoves.push(new Square(index, currentSquare.col))
            }
        }

        return availableMoves
    }
}
