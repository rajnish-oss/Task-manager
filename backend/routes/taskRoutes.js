import express from 'express'

import { createSubTask, createTask, dashboardStatistics, deleteRestoreTask, duplicateTask, getTask,getTasks, postTaskActivity, trashTask, updateTask } from '../Controller/task_controlle.js'
import { isAdminRoute, protectRoute } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/create",isAdminRoute,createTask)
router.post("/duplicate/:id",isAdminRoute,duplicateTask)
router.post("/activity/:id",protectRoute,postTaskActivity)

router.get("/dashboard",protectRoute,dashboardStatistics)
router.get("/",protectRoute,getTasks)
router.get("/:id",protectRoute,getTask)

router.put("/create-subtask/:id",createSubTask)
router.put("/update-task",updateTask)
router.put("/:id",trashTask)

router.delete("delete-restore/:id",isAdminRoute,protectRoute,deleteRestoreTask)

export default router