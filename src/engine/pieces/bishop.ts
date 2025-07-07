import Piece from './piece';
import Player from '../player';
import Board from '../board';
import {PieceType} from "./pieceType";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
        this.type = PieceType.Bishop
    }

    public getAvailableMoves(board: Board) {
        let currentSquare = board.findPiece(this)

        return this.getDiagonalMoves(currentSquare, board)
    }
}
