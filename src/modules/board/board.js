import Express from 'express'
import DB from '../../database/MySQL_database_connect.js'
import BoardModel from './model/model_board.js'
import BoardService from './service/service_board.js'
import BoardController from './contoroller/controller_board.js'

const router = Express.Router()

const dataBase = DB
const boardModel = new BoardModel(dataBase)
const boardSerivce = new BoardService(boardModel)
const boardController = new BoardController(boardSerivce)

router.get('/', boardController.getBoards.bind(boardController))
router.post('/', boardController.postBoard.bind(boardController))
router.get('/:boardCode', boardController.getBoardById.bind(boardController))
router.put('/:boardCode', boardController.putBoard.bind(boardController))
router.delete('/:boardCode', boardController.deleteBoard.bind(boardController))
router.post('/:boardCode/view', boardController.postViewBoard.bind(boardController))
router.post('/:boardCode/recommend', boardController.postRecommendBoard.bind(boardController))

export default router
