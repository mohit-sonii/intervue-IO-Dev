import { Router } from "express";
import { addVote } from "../controllers/student.controller.js";

const router = Router()

router.route("/questions").post(addVote)

export default router