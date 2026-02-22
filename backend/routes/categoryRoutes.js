import express from "express";

import {adminOnly} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.js"
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js";
const categoryRoutes=express.Router();

categoryRoutes.post("/add",adminOnly,upload.single("image"),addCategory);
categoryRoutes.put("/update/:id",adminOnly,upload.single("image"),updateCategory);
categoryRoutes.delete("/delete/:id",adminOnly,deleteCategory);
categoryRoutes.get("/all",getAllCategories);
categoryRoutes.get("/:id",getCategoryById);


export default categoryRoutes;