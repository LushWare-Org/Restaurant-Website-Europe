import express from "express";
import { adminOnly } from "../middlewares/authMiddleware.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/stats", adminOnly, getDashboardStats);

export default dashboardRoutes;
