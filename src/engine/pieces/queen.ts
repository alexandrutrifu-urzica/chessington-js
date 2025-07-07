import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import {PieceType} from "./pieceType";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
        this.type = PieceType.Queen
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = []
        let currentSquare = board.findPiece(this)

        availableMoves = availableMoves
            .concat(this.getHorizontalMoves(currentSquare, board))
            .concat(this.getVerticalMoves(currentSquare, board))
            .concat(this.getDiagonalMoves(currentSquare, board))

        return availableMoves
    }
}
