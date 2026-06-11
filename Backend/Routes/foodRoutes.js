import express from "express";
import { deleteFoodById, getAllFoods, getFoodById, postFood, updateFood } from "../Controller/foodController.js";
import { verifyToken } from "../MiddleWare/verifyToken.js";

const router = express.Router();
router.post("/", postFood);

router.get("/", getAllFoods);
router.get("/:id",verifyToken,getFoodById )
router.delete("/:id",deleteFoodById )
router.put("/:id",updateFood )

export default router;
