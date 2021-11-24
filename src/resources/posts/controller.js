const dbClient = require("../../utils/dbClient");

const prisma = dbClient;

const getUserPosts = async (req, res) => {
  console.log({ headers: req.headers.authorization });
  const userId = req.headers.authorization;
  try {
    const authUserPosts = await prisma.post.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        user: true,
      },
    });

    res.status(200).json(authUserPosts);
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    res.status(500).json({ error });
  }
};

module.exports = { getUserPosts };
