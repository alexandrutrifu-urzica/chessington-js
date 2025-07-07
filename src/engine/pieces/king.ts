import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import {PieceType} from "./pieceType";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
        this.type = PieceType.King
    }

    public getAvailableMoves(board: Board) {
        const steps = [-1, 0, 1]
        const currentSquare = board.findPiece(this)
        let availableMoves: Square[] = []

        for (let rowAdjustment of steps) {
            for (let colAdjustment of steps) {
                if (rowAdjustment == 0 && colAdjustment == 0) {
                    continue
                }

                let rowIndex = currentSquare.row + rowAdjustment
                let colIndex = currentSquare.col + colAdjustment

                if (this.isNotBlocked(rowIndex, colIndex, board) ||
                this.isBlockedByOpponent(rowIndex, colIndex, board)) {
                    availableMoves.push(new Square(rowIndex, colIndex))
                }
            }
        }

        return availableMoves
    }
}
