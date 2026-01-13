import { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const ChessGame = () => {
    const [game, setGame] = useState(new Chess());
    const [gameStatus, setGameStatus] = useState('');

    // Check game status
    useEffect(() => {
        if (game.isGameOver()) {
            if (game.isCheckmate()) {
                setGameStatus(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`);
            } else if (game.isDraw()) {
                setGameStatus('Draw!');
            } else {
                setGameStatus('Game Over!');
            }
        } else {
            setGameStatus('');
        }
    }, [game]);

    // AI Move Logic
    const makeRandomMove = useCallback(() => {
        setGame((prevGame) => {
            const gameCopy = new Chess(prevGame.fen());

            // If it's not Black's turn or game is over, don't move
            if (gameCopy.turn() !== 'b' || gameCopy.isGameOver()) return prevGame;

            const possibleMoves = gameCopy.moves();
            if (possibleMoves.length === 0) return prevGame;

            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            gameCopy.move(possibleMoves[randomIndex]);

            return gameCopy;
        });
    }, []);

    // Trigger AI move when it's Black's turn
    useEffect(() => {
        if (game.turn() === 'b' && !game.isGameOver()) {
            const timeoutId = setTimeout(makeRandomMove, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [game, makeRandomMove]);

    function onDrop(sourceSquare, targetSquare) {
        // Only allow moves if it's White's turn
        if (game.turn() !== 'w') return false;

        const gameCopy = new Chess(game.fen());

        try {
            // Check if move is a promotion
            const piece = gameCopy.get(sourceSquare);
            const isPromotion = (
                piece?.type === 'p' &&
                (sourceSquare[1] === '7' && targetSquare[1] === '8')
            );

            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: isPromotion ? 'q' : undefined,
            });

            // If move is illegal, move will be null
            if (move === null) return false;

            // Update state with the new game position
            setGame(gameCopy);
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">You (White) vs Computer (Black)</h3>
                {game.turn() === 'w' ? (
                    <span className="text-green-600 font-bold">Your Turn</span>
                ) : (
                    <span className="text-red-600 font-bold">Computer Thinking...</span>
                )}
            </div>

            <div className="w-full max-w-[500px] shadow-xl rounded-lg overflow-hidden border-4 border-gray-800">
                <Chessboard
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    boardOrientation="white"
                />
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
                {gameStatus && (
                    <div className="p-4 bg-indigo-100 text-indigo-800 rounded-xl font-bold text-xl animate-bounce">
                        {gameStatus}
                    </div>
                )}

                <button
                    onClick={() => {
                        setGame(new Chess());
                        setGameStatus('');
                    }}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-lg font-semibold"
                >
                    Reset Game
                </button>
            </div>
        </div>
    );
};

export default ChessGame;
