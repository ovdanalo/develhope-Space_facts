"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = require("../lib/middleware/cors");
const validation_1 = require("../lib/middleware/validation");
const session_1 = require("../lib/middleware/session");
const passport_1 = require("../lib/middleware/passport");
const error_1 = require("../lib/middleware/error");
const planets_1 = __importDefault(require("./routes/planets"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, session_1.initSessionMiddleware)(app.get("env")));
app.use(passport_1.passport.initialize());
app.use(passport_1.passport.session());
app.use(express_1.default.json());
app.use((0, cors_1.initCorsMiddleware)());
app.use('/planets', planets_1.default);
app.use("/auth", auth_1.default);
app.use(error_1.notFoundMiddleware);
app.use(validation_1.validationErrorMiddleware);
app.use((0, error_1.initErrorMiddleware)(app.get("env")));
exports.default = app;
//# sourceMappingURL=app.js.map