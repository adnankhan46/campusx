import express from "express";
import { allnotif, deletenotif } from "../notification/notification.controller.js";


const router = express.Router();

router.get("/allnotif/:userId", allnotif);
router.post("/deletenotif/:userId", deletenotif);



export default router;