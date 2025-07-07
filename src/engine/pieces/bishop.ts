import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = []
        let currentSquare = board.findPiece(this)

        const directions = [-1, 1]
        const isValidIndex = (index: number) => (0 <= index) && (index < 8)

        for (let rowAdjustment of directions) {
            for (let colAdjustment of directions) {
                let rowIndex = currentSquare.row + rowAdjustment
                let colIndex = currentSquare.col + colAdjustment

                while (isValidIndex(rowIndex) && isValidIndex(colIndex)) {
                    availableMoves.push(new Square(rowIndex, colIndex))

                    rowIndex += rowAdjustment
                    colIndex += colAdjustment
                }
            }
        }

        return availableMoves
    }
}
