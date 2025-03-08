import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.serviceCategory.create({
        data: { name: 'Cybersecurity', description: 'Consultoria em cybersecurity' },
    });

    await prisma.user.create({
        data: { firebaseId: '3', name: 'Gabigol', email: 'gabigol@email.com', balance: 1 }
    });

    await prisma.post.create({
        data: { title: 'Procuro programador', description: 'Serviços de programação', price: 1 }
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

