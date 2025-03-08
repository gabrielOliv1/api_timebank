import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.serviceCategory.createMany({
        data: [
            { name: 'Desenvolvimento Web', description: 'Criação de aplicações Web' },
            { name: 'Design digital', description: 'Desenvolvimento de interfaces, UI/UX.' }
        ]
    });

    await prisma.user.create({
        data: { firebaseId: '1', name: 'Gabriel', email: 'gabriel@email.com', balance: 1 }
    });

    await prisma.post.create({
        data: { title: 'Procuro designer', description: 'Serviços de design', price: 1 }
    })

    console.log('> Seed concluída!');
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });

