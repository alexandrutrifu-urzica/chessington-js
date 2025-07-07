import Player from '../player';
import Board from '../board';
import Square from '../square';
import {PieceType} from "./pieceType";

export default class Piece {
    public player: Player;
    public type: PieceType | undefined

    isValidIndex = (index: number) => (0 <= index) && (index < 8)

    isValidMove = (row: number, col: number, board: Board) =>
        this.isValidIndex(row) && this.isValidIndex(col) && board.getPiece(Square.at(row, col)) === undefined

    isBlockedByOpponent = (row: number, col: number, board: Board) => {
        if (!this.isValidIndex(row) || !this.isValidIndex(col)) {
            return false
        }

        let blockedSquare = new Square(row, col)
        let blockingPiece = board.getPiece(blockedSquare)

        return blockingPiece !== undefined &&
            blockingPiece.player !== this.player &&
            blockingPiece.type !== PieceType.King
    }


    public constructor(player: Player) {
        this.player = player;
        this.type = undefined
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

        // Left movement
        let index = currentSquare.col - 1

        while (this.isValidMove(currentSquare.row, index, board)) {
            availableMoves.push(new Square(currentSquare.row, index))
            index--
        }

        // Check if the current piece was blocked by an opponent
        if (this.isBlockedByOpponent(currentSquare.row, index, board)) {
            availableMoves.push(new Square(currentSquare.row, index))
        }

        // Right movement
        index = currentSquare.col + 1

        while (this.isValidMove(currentSquare.row, index, board)) {
            availableMoves.push(new Square(currentSquare.row, index))
            index++
        }

        // Check if the current piece was blocked by an opponent
        if (this.isBlockedByOpponent(currentSquare.row, index, board)) {
            availableMoves.push(new Square(currentSquare.row, index))
        }

        return availableMoves
    }

    public getVerticalMoves(currentSquare: Square, board: Board) {
        let availableMoves: Square[] = []

        // Up movement
        let index = currentSquare.row + 1

        while (this.isValidMove(index, currentSquare.col, board)) {
            availableMoves.push(new Square(index, currentSquare.col))
            index++
        }

        // Check if the current piece was blocked by an opponent
        if (this.isBlockedByOpponent(index, currentSquare.col, board)) {
            availableMoves.push(new Square(index, currentSquare.col))
        }

        // Down movement
        index = currentSquare.row - 1

        while (this.isValidMove(index, currentSquare.col, board)) {
            availableMoves.push(new Square(index, currentSquare.col))
            index--
        }

        if (this.isBlockedByOpponent(index, currentSquare.col, board)) {
            availableMoves.push(new Square(index, currentSquare.col))
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

                if (this.isBlockedByOpponent(rowIndex, colIndex, board)) {
                    availableMoves.push(new Square(rowIndex, colIndex))
                }
            }
        }

        return availableMoves
    }
}
