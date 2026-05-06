import express from "express";
import {
  getCertificateById,
  searchCertificate,
  upsertCertificate,
  uploadCertificateImage,
} from "../controllers/certificateControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/certificates/verify").get(searchCertificate);
router.route("/certificates/verify/:certificateId").get(getCertificateById);
router.route("/certificates").post(isAuthenticatedUser, authorizeRoles("admin"), upsertCertificate);
router
  .route("/certificates/upload-image")
  .post(isAuthenticatedUser, authorizeRoles("admin"), uploadCertificateImage);

export default router;
