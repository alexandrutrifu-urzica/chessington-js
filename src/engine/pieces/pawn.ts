import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    private firstMove: boolean = true

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = []
        let currentSquare = board.findPiece(this)

        if (this.player == Player.WHITE) {
            availableMoves.push(new Square(currentSquare.row + 1, currentSquare.col))

            if (this.firstMove) {
                availableMoves.push(new Square(currentSquare.row + 2, currentSquare.col))
            }
        } else {
            availableMoves.push(new Square(currentSquare.row - 1, currentSquare.col))

            if (this.firstMove) {
                availableMoves.push(new Square(currentSquare.row - 2, currentSquare.col))
            }
        }

        return availableMoves
    }

    moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.firstMove = false
    }
}
