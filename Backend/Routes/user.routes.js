const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserDetails,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updatePersonalDetails,
  DeleteUser,
  updateUserRole,
  intializeUser,
  updateAvatar,
  getAllusersDetail,
  updateUserRoleByAdmin,
} = require("../Controllers/user.controller.js");

const {
  checkAuthenticated,
  authorizeRoles,
} = require("../Middlewares/authentication.js");

const upload = require("../Middlewares/multer.js");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/update/:id").put(updateUserDetails);

router.route("/me").get(getUserDetails);

router.route("/getuser").get(intializeUser);

router.route("/password/update").put(updatePassword);

router.route("/me/update").put(updatePersonalDetails);

router.route("/user/delete/:id").delete(authorizeRoles("DELETE"), DeleteUser);

router
  .route("/user/updateRole/:id")
  .put(authorizeRoles("WRITE"), updateUserRole);

router
  .route("/user/updateRoleAsAdmin/:id")
  .put(authorizeRoles("WRITE"), updateUserRoleByAdmin);

router
  .route("/user/avatar")
  .put(
    checkAuthenticated(),
    authorizeRoles("WRITE"),
    upload.single("avatar"),
    updateAvatar
  );

router.route("/users").get(getAllusersDetail);

module.exports = router;
