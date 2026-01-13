import { useState, useEffect } from 'react';
import { getSudoku } from 'sudoku-gen';
import { Trophy } from 'lucide-react';

const SudokuGame = () => {
    const [board, setBoard] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    const [selectedCell, setSelectedCell] = useState(null);
    const [mistakes, setMistakes] = useState(0);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        startNewGame();
    }, [difficulty]);

    const startNewGame = () => {
        const sudoku = getSudoku(difficulty);
        const newBoard = [];

        let k = 0;
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const val = sudoku.puzzle[k];
                const solutionVal = sudoku.solution[k];
                const isEditable = val === '-';

                row.push({
                    value: isEditable ? '' : val,
                    isEditable,
                    solution: solutionVal,
                    isError: false
                });
                k++;
            }
            newBoard.push(row);
        }

        setBoard(newBoard);
        setMistakes(0);
        setSelectedCell(null);
        setIsWon(false);
    };

    const checkWin = (currentBoard) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentBoard[i][j].value === '' || currentBoard[i][j].isError) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleCellClick = (row, col) => {
        if (isWon) return;
        if (board[row][col].isEditable) {
            setSelectedCell({ row, col });
        } else {
            setSelectedCell(null);
        }
    };

    const handleNumberInput = (num) => {
        if (!selectedCell || isWon) return;

        const { row, col } = selectedCell;
        const cell = board[row][col];

        if (!cell.isEditable) return;

        const newBoard = board.map(r => r.map(c => ({ ...c }))); // Deep copy
        const isCorrect = num.toString() === cell.solution;

        newBoard[row][col] = {
            ...cell,
            value: num,
            isError: !isCorrect
        };

        if (!isCorrect) {
            setMistakes(prev => prev + 1);
        }

        setBoard(newBoard);

        if (isCorrect && checkWin(newBoard)) {
            setIsWon(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {isWon && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform scale-110 transition-all">
                        <div className="flex justify-center mb-4">
                            <div className="bg-yellow-100 p-4 rounded-full">
                                <Trophy className="w-16 h-16 text-yellow-600 animate-bounce" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                        <p className="text-gray-600 mb-6">You solved the {difficulty} puzzle!</p>
                        <button
                            onClick={startNewGame}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                    <span className="text-gray-600 font-medium">Difficulty:</span>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="bg-transparent font-bold text-indigo-600 focus:outline-none cursor-pointer"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <button
                    onClick={startNewGame}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                    New Game
                </button>

                <div className={`px-4 py-2 rounded-lg font-bold ${mistakes >= 3 ? 'bg-red-100 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    Mistakes: {mistakes}
                </div>
            </div>

            <div className="grid grid-cols-9 gap-0.5 bg-gray-800 border-4 border-gray-800 shadow-xl rounded-lg overflow-hidden">
                {board.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            className={`
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl font-bold cursor-pointer transition-colors duration-150
                ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2 border-gray-800' : ''}
                ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2 border-gray-800' : ''}
                ${cell.isEditable ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-gray-100 text-gray-900'}
                ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? '!bg-indigo-200 ring-2 ring-indigo-400 z-10' : ''}
                ${cell.isError ? '!bg-red-100 !text-red-600' : ''}
                ${cell.value && !cell.isError && cell.isEditable ? '!text-green-600' : ''}
              `}
                        >
                            {cell.value}
                        </div>
                    ))
                ))}
            </div>

            <div className="mt-8 grid grid-cols-9 gap-2 sm:gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberInput(num)}
                        className="w-8 h-8 sm:w-12 sm:h-12 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-1 active:scale-95 text-lg"
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SudokuGame;
