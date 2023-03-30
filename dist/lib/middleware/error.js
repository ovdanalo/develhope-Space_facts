"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initErrorMiddleware = exports.notFoundMiddleware = void 0;
const node_http_1 = require("node:http");
function getErrorMessage(error) {
    if (error.stack) {
        return error.stack;
    }
    if (typeof error.toString === "function") {
        return error.toString();
    }
    return "";
}
function isErrorStatusCode(statusCode) {
    return statusCode >= 400 && statusCode < 600;
}
function getHttpStatusCode(error, res) {
    const statusCodeFromError = error.status || error.statusCode;
    if (statusCodeFromError && isErrorStatusCode(statusCodeFromError)) {
        return statusCodeFromError;
    }
    const statusCodeFromResponse = res.statusCode;
    if (isErrorStatusCode(statusCodeFromResponse)) {
        return statusCodeFromResponse;
    }
    return 500;
}
const notFoundMiddleware = (req, res, next) => {
    res.status(404);
    next(`Cannot ${req.method} ${req.path}`);
};
exports.notFoundMiddleware = notFoundMiddleware;
function initErrorMiddleware(appEnvironment) {
    return function errorMiddleware(error, req, res, next) {
        const errorMessage = getErrorMessage(error);
        if (appEnvironment !== "test") {
            console.error(errorMessage);
        }
        if (res.headersSent) {
            return next(error);
        }
        const statusCode = getHttpStatusCode(error, res);
        const errorResponse = {
            statusCode,
            error: node_http_1.STATUS_CODES[statusCode + ""],
            message: ""
        };
        if (appEnvironment !== "production") {
            errorResponse.message = errorMessage;
        }
        res.status(errorResponse.statusCode).json(errorResponse);
        next();
    };
}
exports.initErrorMiddleware = initErrorMiddleware;
//# sourceMappingURL=error.js.map