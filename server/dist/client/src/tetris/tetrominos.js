"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomTetromino = exports.TETROMINOS = void 0;
exports.TETROMINOS = {
    0: {
        shape: [
            [0]
        ],
        color: '0, 0, 0'
    },
    'G': {
        shape: [
            ['G']
        ],
        color: '100, 100, 100'
    },
    'I': {
        shape: [
            [0, 0, 0, 0],
            ['I', 'I', 'I', 'I'],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: '80, 227, 230'
    },
    'J': {
        shape: [
            ['J', 0, 0],
            ['J', 'J', 'J'],
            [0, 0, 0]
        ],
        color: '36, 95, 223'
    },
    'L': {
        shape: [
            [0, 0, 'L'],
            ['L', 'L', 'L'],
            [0, 0, 0]
        ],
        color: '233, 173, 36'
    },
    'O': {
        shape: [
            ['O', 'O'],
            ['O', 'O']
        ],
        color: '223, 217, 36'
    },
    'S': {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        color: '48, 211, 56'
    },
    'T': {
        shape: [
            [0, 'T', 0],
            ['T', 'T', 'T'],
            [0, 0, 0]
        ],
        color: '132, 61, 198'
    },
    'Z': {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],
        color: '227, 78, 78'
    }
};
const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const choosen = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return exports.TETROMINOS[choosen];
};
exports.randomTetromino = randomTetromino;
//# sourceMappingURL=tetrominos.js.map