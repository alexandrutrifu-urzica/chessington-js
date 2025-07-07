import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = []
        let currentSquare = board.findPiece(this)

        availableMoves = availableMoves
            .concat(this.getHorizontalMoves(currentSquare))
            .concat(this.getVerticalMoves(currentSquare))
            .concat(this.getDiagonalMoves(currentSquare))

        return availableMoves
    }
}
