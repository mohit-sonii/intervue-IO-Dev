import { Router } from "express";
import { addQuestion, getQuestion } from "../controllers/teacher.controller.js";

const router = Router();

router.route("/add-questions").post(addQuestion)
router.route("/get-questions").get(getQuestion)

export default router