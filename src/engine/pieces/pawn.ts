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
        let rowAdjustment = this.player == Player.WHITE ? 1 : -1

        if (this.isValidMove(rowIndex + rowAdjustment, colIndex, board)) {
            availableMoves.push(new Square(rowIndex + rowAdjustment, colIndex))

            if (this.firstMove && this.isValidMove(rowIndex + 2 * rowAdjustment, colIndex, board)) {
                availableMoves.push(new Square(rowIndex + 2 * rowAdjustment, colIndex))
            }
        }

        return availableMoves
    }

    moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.firstMove = false
    }
}
