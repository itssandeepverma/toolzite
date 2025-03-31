import express from "express";
import passport from "passport";
import {
  allUsers,
  deleteUser,
  forgotPassword,
  getUserDetails,
  getUserProfile,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
  uploadAvatar,
} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/register").post(registerUser);
// router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/upload_avatar").put(isAuthenticatedUser, uploadAvatar);

router.route("/login").post(async (req, res, next) => {
  try {
      console.log("Request Body:", req.body);  // 🛠 Debugging ke liye

      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ message: "Please provide email and password" });
      }

      // Aapka authentication logic yaha hoga

      res.status(200).json({ message: "Login successful!" });

  } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});



router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);

router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// 🔹 Google OAuth Login Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  }
);


export default router;
