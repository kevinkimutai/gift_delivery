import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  try {
    console.log("ENV KEY", process.env.SECRET_ACCESS_TOKEN_JWT);
    const token = jwt.sign({ id }, process.env.SECRET_ACCESS_TOKEN_JWT, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });

    return token;
  } catch (error) {
    console.error(error);
  }
};
