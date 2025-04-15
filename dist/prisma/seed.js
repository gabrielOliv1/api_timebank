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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.serviceCategory.create({
            data: { name: 'Cybersecurity', description: 'Consultoria em cybersecurity' },
        });
        yield prisma.user.create({
            data: { firebaseId: '3', name: 'Gabigol', email: 'gabigol@email.com', balance: 1 }
        });
        yield prisma.post.create({
            data: { title: 'Procuro programador', description: 'Serviços de programação', price: 1 }
        });
        console.log('> Seed concluída!');
    });
}
main()
    .catch((err) => {
    console.error(err);
    process.exit(1);
})
    .finally(() => {
    prisma.$disconnect();
});
