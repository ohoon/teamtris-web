"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStage = exports.STAGE_HEIGHT = exports.STAGE_WIDTH = void 0;
exports.STAGE_WIDTH = 12;
exports.STAGE_HEIGHT = 20;
const createStage = () => {
    return Array.from(Array(exports.STAGE_HEIGHT), () => new Array(exports.STAGE_WIDTH).fill([0, 'not blocked']));
};
exports.createStage = createStage;
//# sourceMappingURL=stage.js.map