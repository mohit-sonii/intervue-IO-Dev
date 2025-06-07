import { Router } from "express";
import { addQuestion, getQuestion } from "../controllers/teacher.controller.js";

const router = Router();

router.route("/add-questions").post(addQuestion)

export default router