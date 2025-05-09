// prisma/seed.ts
// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  // Create sample workers
  const john = await prisma.worker.create({
    data: {
      name: "John Harvester",
      role: "HARVESTER",
    },
  });

  const mary = await prisma.worker.create({
    data: {
      name: "Mary Carrier",
      role: "CARRIER",
    },
  });

  // Create a sample harvest for John
  await prisma.harvest.create({
    data: {
      field: "Block A",
      quantity: 25,
      workerId: john.id,
    },
  });

  // Create another harvest for Mary (even if she's a carrier—just for example/testing)
  await prisma.harvest.create({
    data: {
      field: "Block B",
      quantity: 40,
      workerId: mary.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
