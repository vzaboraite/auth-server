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

const signin = async (req, res) => {
  console.log("Inside signin controller: ", req.body);
  const userToFind = {
    ...req.body,
  };
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: userToFind.email,
      },
    });

    if (!foundUser) {
      res.status(401).json({ error: "Authentication failed" });
    }

    if (userToFind.password === foundUser.password) {
      res.status(200).json(foundUser);
    } else {
      res.status(401).json({ error: "Authentication failed" });
    }

    console.log(foundUser);
  } catch (error) {
    console.error("[ERROR] /signin route: ", error);

    res.status(500).json({ error });
  }
};

module.exports = { signup, signin };
