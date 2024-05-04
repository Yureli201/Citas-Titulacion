import express from "express";
import { loginEController, loginPController } from "../controllers/loginController.js";

const router = express.Router();

// Ruta para el inicio de sesión
router.get("/egresado/:mat", loginEController);

router.get("/personal/:mat", loginPController);

export default router;
