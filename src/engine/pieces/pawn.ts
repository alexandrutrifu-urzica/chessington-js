import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import {PieceType} from "./pieceType";

export default class Pawn extends Piece {
    private firstMove: boolean = true

    public constructor(player: Player) {
        super(player);
        this.type = PieceType.Pawn
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = []
        let currentSquare = board.findPiece(this)

        let rowIndex = currentSquare.row
        let colIndex = currentSquare.col
        let indexAdjustment = this.player == Player.WHITE ? 1 : -1

        // Straight movement
        if (this.isNotBlocked(rowIndex + indexAdjustment, colIndex, board)) {
            availableMoves.push(new Square(rowIndex + indexAdjustment, colIndex))

            if (this.firstMove && this.isNotBlocked(rowIndex + 2 * indexAdjustment, colIndex, board)) {
                availableMoves.push(new Square(rowIndex + 2 * indexAdjustment, colIndex))
            }
        }

        // Diagonal movement for capturing enemy pieces
        if (this.isBlockedByOpponent(rowIndex + indexAdjustment, colIndex + 1, board)) {
            availableMoves.push(new Square(rowIndex + indexAdjustment, colIndex + 1))
        }

        if (this.isBlockedByOpponent(rowIndex + indexAdjustment, colIndex - 1, board)) {
            availableMoves.push(new Square(rowIndex + indexAdjustment, colIndex - 1))
        }

        return availableMoves
    }

    moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.firstMove = false
    }
}
