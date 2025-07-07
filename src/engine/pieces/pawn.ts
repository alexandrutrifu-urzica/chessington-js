import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = []
        let currentSquare = board.findPiece(this)

        if (this.player == Player.WHITE) {
            availableMoves.push(new Square(currentSquare.row + 1, currentSquare.col))
        } else {
            availableMoves.push(new Square(currentSquare.row - 1, currentSquare.col))
        }

        return availableMoves
    }
}
