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

        availableMoves = availableMoves
            .concat(this.getHorizontalMoves(currentSquare, board))
            .concat(this.getVerticalMoves(currentSquare, board))

        return availableMoves
    }
}
