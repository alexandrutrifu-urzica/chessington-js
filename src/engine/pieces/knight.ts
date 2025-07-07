import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let rowAdjustments = [2, 1, -1, -2, -2, -1, 1, 2]
        let colAdjustments = [1, 2, 2, 1, -1, -2, -2, -1]

        let availableMoves: Square[] = []
        const currentSquare = board.findPiece(this)

        for (let index = 0; index < 8; index++) {
            let rowIndex = currentSquare.row + rowAdjustments[index]
            let colIndex = currentSquare.col + colAdjustments[index]

            if (this.isValidMove(rowIndex, colIndex, board)) {
                availableMoves.push(new Square(rowIndex, colIndex))
            }
        }

        return availableMoves
    }
}
