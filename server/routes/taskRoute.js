import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation,
  paginationValidation,
  validate,
} from "../middleware/validation.js";

const router = express.Router();

router.post(
  "/tasks",
  authMiddleware,
  createTaskValidation,
  validate,
  createTask,
);
router.get("/tasks", authMiddleware, paginationValidation, validate, getTasks);
router.put(
  "/tasks/:id",
  authMiddleware,
  updateTaskValidation,
  validate,
  updateTask,
);
router.delete(
  "/tasks/:id",
  authMiddleware,
  taskIdValidation,
  validate,
  deleteTask,
);
router.patch(
  "/tasks/:id/toggle",
  authMiddleware,
  taskIdValidation,
  validate,
  toggleTaskCompletion,
);

export default router;
