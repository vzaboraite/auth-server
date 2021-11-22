const { PrismaClient } = require("@prisma/client");

const dbClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", async (e) => {
  console.log(e);
});

module.exports = dbClient;
