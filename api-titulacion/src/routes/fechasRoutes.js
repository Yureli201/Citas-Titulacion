import express from "express";
import {agregarFechasController, obtenerFechasController, eliminarFechasController,eliminarTodasController} from "../controllers/fechasController.js"

const router = express.Router();


//Ruta para agregar fechas bloqueadas
router.post("/fechas/agregar",agregarFechasController);

//Ruta para obtener todas las fechas bloqueadas
router.get("/fechas/obtener", obtenerFechasController);

//Ruta para eliminar las fechas
router.post("/fechas/eliminar", eliminarFechasController);

//Ruta para eliminar todas las fechas
router.delete("/fechas/eliminarTodas", eliminarTodasController);


export default router;