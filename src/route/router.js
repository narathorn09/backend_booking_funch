import { Router } from 'express'
import { createUser } from "../controller/userController.js"
const router = Router()

router.route('/users')
  .post(createUser);

export default router