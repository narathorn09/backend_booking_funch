import { Router } from 'express'
import { createUser, getUsers } from "../controller/userController.js"
const router = Router()

router.route('/user')
  .post(createUser)
  .get(getUsers)

export default router