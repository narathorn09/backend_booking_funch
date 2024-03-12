import { Router } from 'express'
import { createUser, getUsers, register, login } from "../controller/userController.js"
const router = Router()

router.route('/user')
  .post(createUser)
  .get(getUsers)
router.route('/register')
  .post(register)
router.route('/login')
  .post(login)

export default router