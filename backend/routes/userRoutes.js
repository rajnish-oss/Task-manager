import express from 'express'
import { protectRoute,isAdminRoute } from '../middleware/authMiddleware.js'
import { getTeamList,registerUser,loginUser,logoutUser,getNotificationList, updateUserProfile, markNotificationRead, changeUserPassword, deleteUserProfile, activateUserProfile } from '../Controller/user_controlle.js'

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)

router.get("/get-team",protectRoute,isAdminRoute,getTeamList) 
router.get("/notification",protectRoute,getNotificationList)

router.put("/profile",protectRoute,isAdminRoute,updateUserProfile)
router.put("/read-notification",protectRoute,markNotificationRead)
router.put("/change-pass",protectRoute,changeUserPassword)

//for admin only
router.delete("/:id",protectRoute,isAdminRoute,deleteUserProfile)
router.put("/:id",protectRoute,isAdminRoute,activateUserProfile)


export default router