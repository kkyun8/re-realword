//node  prisma/seed.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    email: "alice@prisma.io",
    username: "Alice",
    password: "password",
  },
];

const tagData = [
  {
    name: "tag1",
  },
  {
    name: "tag2",
  },
  {
    name: "tag3",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (const t of tagData) {
    const tag = await prisma.tag.create({
      data: t,
    });
    console.log(`Created tag with name: ${tag.name}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
