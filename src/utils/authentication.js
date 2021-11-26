const dbClient = require("../utils/dbClient");
const jwt = require("jsonwebtoken");

const prisma = dbClient;

const secretKey = process.env.JWT_SECRET;

const createToken = (user) => {
  return jwt.sign({ ...user }, secretKey, { expiresIn: "1d" });
};

const protect = (req, res, next) => {
  console.log({ headers: req.headers.authorization });
  const token = req.headers.authorization;

  const secretKey = process.env.JWT_SECRET;

  jwt.verify(token, secretKey, async (error, payload) => {
    if (error) {
      throw Error("Not Authorized");
    }

    console.log({ payload });

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return res.status(401).end();
    }

    console.log("INSIDE MIDDLEWARE: ", user);

    req.user = user;

    next();
  });
};

module.exports = { createToken, protect };
