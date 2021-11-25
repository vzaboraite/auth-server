const dbClient = require("../../utils/dbClient");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/authentication");
const prisma = dbClient;

const signup = async (req, res) => {
  console.log("Inside signup controller: ", req.body);
  const userToCreate = { ...req.body };

  if (!userToCreate.email || !userToCreate.password) {
    res.status(400).json({ error: "Missing information" });
  }

  try {
    const hashedPassword = await bcrypt.hash(userToCreate.password, 8);

    userToCreate.password = hashedPassword;

    const result = await prisma.user.create({
      data: {
        ...userToCreate,
      },
      select: {
        id: true,
        email: true,
      },
    });

    const token = createToken(result);

    res.json(token);
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

  if (!userToFind.email || !userToFind.password) {
    res.status(400).json({ error: "Missing information" });
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: userToFind.email,
      },
    });

    if (!foundUser) {
      res.status(401).json({ error: "Authentication failed" });
    }

    console.log({
      userToFind: userToFind.password,
      foundUser: foundUser.password,
    });

    const passwordsMatch = await bcrypt.compare(
      userToFind.password,
      foundUser.password
    );

    if (passwordsMatch) {
      const userToToken = {
        ...foundUser,
      };

      delete userToToken.password;

      const token = createToken(userToToken);

      res.status(200).json(token);
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
