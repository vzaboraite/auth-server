const dbClient = require("../../utils/dbClient");

const prisma = dbClient;

const getUserPosts = async (req, res) => {
  const user = req.user;

  try {
    const authUserPosts = await prisma.post.findMany({
      where: {
        userId: user.id,
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
