import { Router } from "express";
import { addQuestion } from "../controllers/methods.controller.js";

const router = Router();

router.route("/add-questions").post(addQuestion)

export default router