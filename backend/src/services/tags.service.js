const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function get() {
  return await prisma.tag.findMany();
}

module.exports = {
  get,
};
