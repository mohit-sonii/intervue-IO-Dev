import { Router } from "express";
import { addQuestion, getAllQuestions } from "../controllers/methods.controller.js";

const router = Router();

router.route("/add-questions").post(addQuestion)
router.route("/get-all-questions").get(getAllQuestions)

export default router