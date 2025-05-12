"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const prisma_1 = require("../generated/prisma");
const logging_1 = require("./logging");
exports.prismaClient = new prisma_1.PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        },
        {
            emit: "event",
            level: "error"
        }
    ]
});
exports.prismaClient.$on("query", e => {
    logging_1.logger.info(e);
});
exports.prismaClient.$on("info", e => {
    logging_1.logger.info(e);
});
exports.prismaClient.$on("warn", e => {
    logging_1.logger.warn(e);
});
exports.prismaClient.$on("error", e => {
    logging_1.logger.error(e);
});
