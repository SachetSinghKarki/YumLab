import express from "express";
import { deleteUserById, getAllUsers, getUserById, postUser, updateProfile, updateUser } from "../Controller/userController.js";
import { verifyToken } from "../MiddleWare/verifyToken.js";

const router = express.Router();

router.get("/", getAllUsers);
router.put("/profile", verifyToken, updateProfile);
router.get("/:id", verifyToken, getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", verifyToken, updateUser);

export default router;
