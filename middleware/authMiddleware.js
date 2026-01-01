import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }

  try {
    const user = verifyJWT(token);
    const { userId, role } = user;
    const testUser = userId === "69527070555658e68b48bcce";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "not authorized to access this route" });
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Demo User. Read Only Access!" });
  }
  next();
};
