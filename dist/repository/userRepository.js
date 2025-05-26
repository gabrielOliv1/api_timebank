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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getByEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            return yield this.prisma.user.findUnique({
                where: { email },
            });
        });
    }
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, firebaseId, balance }) {
            return yield this.prisma.user.create({
                data: {
                    name,
                    email,
                    firebaseId,
                    balance
                }
            });
        });
    }
}
exports.UserRepository = UserRepository;
