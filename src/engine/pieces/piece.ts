import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;
    isValidIndex = (index: number) => (0 <= index) && (index < 8)
    isValidMove = (row: number, col: number, board: Board) =>
        this.isValidIndex(row) && this.isValidIndex(col) && board.getPiece(Square.at(row, col)) === undefined

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public getHorizontalMoves(currentSquare: Square, board: Board) {
        let availableMoves: Square[] = []

        for (let index = 0; index < 8; index++) {
            if (this.isValidMove(currentSquare.row, index, board)) {
                availableMoves.push(new Square(currentSquare.row, index))
            }
        }

        return availableMoves
    }

    public getVerticalMoves(currentSquare: Square, board: Board) {
        let availableMoves: Square[] = []

        for (let index = 0; index < 8; index++) {
            if (this.isValidMove(index, currentSquare.col, board)) {
                availableMoves.push(new Square(index, currentSquare.col))
            }
        }

        return availableMoves
    }

    public getDiagonalMoves(currentSquare: Square, board: Board) {
        let availableMoves: Square[] = []

        const directions = [-1, 1]

        for (let rowAdjustment of directions) {
            for (let colAdjustment of directions) {
                let rowIndex = currentSquare.row + rowAdjustment
                let colIndex = currentSquare.col + colAdjustment

                while (this.isValidMove(rowIndex, colIndex, board)) {
                    availableMoves.push(new Square(rowIndex, colIndex))

                    rowIndex += rowAdjustment
                    colIndex += colAdjustment
                }
            }
        }

        return availableMoves
    }
}
