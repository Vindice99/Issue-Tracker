import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create test users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: 'Bob Johnson',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
    }),
  ]);

  console.log('✅ Created users:', users.length);
  users.forEach(user => {
    console.log(`  - ${user.name} (${user.email})`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
