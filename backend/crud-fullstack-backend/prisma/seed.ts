import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaMariaDb(databaseUrl);
const prisma = new PrismaClient({ adapter });

async function main() {
  const student1 = await prisma.student.create({
    data: {
      Name: 'Sabin Adams',
      Age: 25,
      Subject: 'Computer Science',
    },
  });

  const student2 = await prisma.student.create({
    data: {
      Name: 'Alex Ruheni',
      Age: 30,
      Subject: 'Mathematics',
    },
  });

  const student3 = await prisma.student.create({
    data: {
      Name: 'John Doe',
      Age: 22,
      Subject: 'Physics',
    },
  });

  console.log({ student1, student2, student3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
