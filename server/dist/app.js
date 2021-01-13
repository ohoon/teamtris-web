"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./api/index"));
const users_1 = __importDefault(require("./api/users"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.set('useUnifiedTopology', true);
mongoose_1.default.connect(process.env.MONGO_DB);
const db = mongoose_1.default.connection;
db.once('open', () => {
    console.log('DB Connected');
});
db.on('error', (err) => {
    console.log('DB ERROR: ', err);
});
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use('/', index_1.default);
app.use('/users', users_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map