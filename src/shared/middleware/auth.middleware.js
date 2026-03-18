import jwt from "jsonwebtoken";
import { ApiErrors } from "../utils/apiError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.jwt;
  
  if (!token) {
    return next(ApiErrors.unauthorized("Unauthorized, please sign in"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(ApiErrors.unauthorized("Token is not valid"));
    }

    req.user = decoded;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      return next(ApiErrors.forbidden("You are not authorized to perform this action"));
    }
  });
};

export const verifyCompany = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isCompany) {
      next();
    } else {
      return next(ApiErrors.forbidden("Only companies can perform this action"));
    }
  });
};

export const verifyCompanyOrAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isCompany || req.user?.isAdmin) {
      next();
    } else {
      return next(ApiErrors.forbidden("You are not authorized to access this resource"));
    }
  });
};

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    return res.status(401).json({ message: "Authentication required, No Cookie" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
