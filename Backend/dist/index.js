"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
const userRouter_1 = require("./routes/userRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT_NUMBER = config_1.default.PORT_NUMBER;
app.use(express_1.default.json());
app.use("/api/v1/user", userRouter_1.userRouter);
mongoose_1.default.connection.on("connected", () => {
    console.log("✅ Mongoose connected successfully");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.MONGO_AUTH_URL);
            console.log("🚀 Connected to MongoDB");
            app.listen(PORT_NUMBER, () => {
                console.log(`Server running on port ${PORT_NUMBER}`);
            });
        }
        catch (err) {
            console.error("❌ Failed to connect to MongoDB", err);
            process.exit(1);
        }
    });
}
main();
