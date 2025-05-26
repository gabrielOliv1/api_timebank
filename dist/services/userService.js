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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const userRepository_1 = require("../repository/userRepository");
const firebase_1 = __importDefault(require("../firebase"));
class UserService {
    constructor() {
        const prisma = new client_1.PrismaClient();
        this.userRepository = new userRepository_1.UserRepository(prisma);
    }
    signupWithEmailPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            const firebaseUser = yield firebase_1.default.auth().createUser({
                displayName: name,
                email,
                password
            });
            const firebaseId = firebaseUser.uid;
            yield this.createUserInOurDatabase({ name, email, firebaseId });
            const token = yield this.createCustomToken(firebaseId);
            return { token };
        });
    }
    createUserInOurDatabase(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, firebaseId }) {
            const user = yield this.userRepository.create({
                name: name,
                email: email,
                firebaseId: firebaseId,
                balance: 0
            });
            return user;
        });
    }
    createCustomToken(firebaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const customToken = yield firebase_1.default.auth().createCustomToken(firebaseId);
            return customToken;
        });
    }
}
exports.UserService = UserService;
