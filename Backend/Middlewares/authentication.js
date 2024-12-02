const jwt = require("jsonwebtoken");
const User = require("../Models/user.model.js");
const Role = require("../Models/role.model.js");

function checkAuthenticated() {
  return async (req, res, next) => {
    const tokenValue = req.cookies[process.env.TOKEN_NAME];

    console.log("I am called", tokenValue);
    if (!tokenValue) {
      return next();
    }
    try {
      const payload = await jwt.verify(
        tokenValue,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (!payload) {
        return next();
      }

      req.user = await User.findById(payload._id).select("-password");

      return next();
    } catch (error) {
      return next();
    }
    return next();
  };
}

// function authorizeRoles(...roles) {
//   return async (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(401).json({
//         success: false,
//         message: "You are unauthorised to access this resource",
//       });
//       return next();
//     }

//     return next();
//   };
// }

function authorizeRoles(permission) {
  return async (req, res, next) => {
    const tokenValue = req.cookies[process.env.TOKEN_NAME];

    console.log("I am called", tokenValue);
    if (!tokenValue) {
      return res.status(401).json({
        bad: true,
        success: false,
        message: "You are unauthorised to access this resource",
      });
    }
    try {
      const payload = await jwt.verify(
        tokenValue,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (!payload) {
        return res.status(401).json({
          bad: true,
          success: false,
          message: "You are unauthorised to access this resource",
        });
      }

      req.user = await User.findById(payload._id).select("-password");

      const userRoles = await Role.findOne({ name: req.user.role });

      if (!userRoles) {
        return res.status(401).json({
          bad: true,
          success: false,
          message: "You are unauthorised to access this resource 2",
        });
      }

      console.log("User roles are : gsgsgsg", userRoles);
      console.log("Permission is : ", permission);

      let { permissions } = userRoles;

      let newArray = [];

      permissions.forEach((permission) =>
        newArray.push(permission.toLowerCase())
      );

      console.log("User newArray are : gsgsgsg", newArray);

      if (!newArray.includes(permission.toLowerCase())) {
        return res.status(401).json({
          success: false,
          bad: true,
          message: "You are unauthorised to access this resource 34",
        });
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        bad: true,
        success: false,
        message: "You are unauthorised to access this resource",
      });
    }
  };
}

module.exports = { checkAuthenticated, authorizeRoles };
