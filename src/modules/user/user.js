import Express from 'express'
import DB from '../../database/MySQL_database_connect.js'
import UserModel from './model/model_user.js'
import UserService from './service/service_user.js'
import UserController from './contoroller/controller_user.js'

const router = Express.Router()

const dataBase = DB
const userModel = new UserModel(dataBase)
const userService = new UserService(userModel)
const userController = new UserController(userService)

router.get('/', userController.getUsers.bind(userController))
router.post('/', userController.postUser.bind(userController))
router.get('/:userCode', userController.getUserById.bind(userController))
router.put('/:userCode', userController.putUser.bind(userController))
router.delete('/:userCode', userController.deleteUser.bind(userController))

export default router
