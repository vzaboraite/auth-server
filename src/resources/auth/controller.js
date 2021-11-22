const dbClient = require("../../utils/dbClient");
const prisma = dbClient;

const signup = async (req, res) => {
  console.log("Inside signup controller: ", req.body);
  const userToCreate = { ...req.body };

  try {
    const result = await prisma.user.create({
      data: {
        ...userToCreate,
      },
    });
    res.json(result);
  } catch (error) {
    console.error("[ERROR] /signup route: ", error);

    res.status(500).json({ error });
  }
};

module.exports = { signup };
