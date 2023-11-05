import { ValidationError } from '../../../error/error.js'
import { isEmpty } from '../../../lib/utils.js'
import {
  ToServiceBoardCodeParams,
  ToServiceFindBoardsParams,
  ToServiceCreateBoardParams,
  ToServiceEditBoardParams,
  ToServiceViewBoardParams,
  ResponseGetBoardsDTO,
  ResponseGetBoardByIdDTO,
  ResponsePutBoardDTO,
  ResponseRecommendBoard,
  ToServiceRecommendBoardParams,
} from '../DTO/controller_DTO.js'

class BoardController {
  constructor(boardService) {
    this.boardService = boardService
  }

  async getBoards(req, res, next) {
    const title = req.query.title
    const content = req.query.content
    const userCode = req.query.userCode
    const userNickname = req.query.userNickname
    const categoryCode = req.query.categoryCode
    const categoryName = req.query.categoryName
    try {
      const params = new ToServiceFindBoardsParams(title, content, userCode, userNickname, categoryCode, categoryName)
      const result = await this.boardService.findBoards(params)
      const DTO = result.map(
        ({
          boardCode,
          title,
          content,
          userCode,
          userNickname,
          categoryCode,
          categoryName,
          writeTime,
          updateTime,
          views,
          recommend,
        }) =>
          new ResponseGetBoardsDTO(
            boardCode,
            title,
            content,
            userCode,
            userNickname,
            categoryCode,
            categoryName,
            writeTime,
            updateTime,
            views,
            recommend,
          ),
      )
      res.json({
        HTTPmethod: req.method,
        HTTPstatusCode: res.statusCode,
        result: DTO,
      })
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }

  async postBoard(req, res, next) {
    const title = req.body.title
    const content = req.body.content
    const userCode = req.body.userCode
    const categoryCode = req.body.categoryCode
    if (isEmpty(title) || isEmpty(content) || isEmpty(userCode) || isEmpty(categoryCode)) {
      res.statusCode = 400
      next(new ValidationError())
    } else {
      try {
        const params = new ToServiceCreateBoardParams(title, content, userCode, categoryCode)
        await this.boardService.createBoard(params)
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          result: {
            title,
            content,
            userCode,
            categoryCode,
          },
          message: 'INSERT board success',
        })
      } catch (error) {
        res.statusCode = 500
        next(error)
      }
    }
  }

  async getBoardById(req, res, next) {
    const boardCode = req.params.boardCode
    try {
      const params = new ToServiceBoardCodeParams(boardCode)
      const result = await this.boardService.findBoardById(params)
      if (isEmpty(result)) {
        res.statusCode = 404
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          message: '존재하지 않는 게시글입니다.',
        })
      } else {
        const DTO = new ResponseGetBoardByIdDTO(
          result.boardCode,
          result.title,
          result.content,
          result.userNickname,
          result.categoryName,
          result.writeTime,
          result.updateTime,
          result.views,
          result.recommend,
          result.isDelete,
        )
        if (DTO.isDelete != 0) {
          res.statusCode = 404
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            message: '삭제된 게시글입니다.',
          })
        } else {
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            result: DTO,
          })
        }
      }
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }

  async putBoard(req, res, next) {
    const boardCode = req.params.boardCode
    const title = req.body.title
    const content = req.body.content
    const categoryCode = req.body.categoryCode
    try {
      const params = new ToServiceEditBoardParams(title, content, boardCode, categoryCode)
      const result = await this.boardService.editBoard(params)
      console.log(result)
      if (isEmpty(result)) {
        res.statusCode = 404
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          message: '존재하지 않는 게시글입니다.',
        })
      } else {
        const DTO = new ResponsePutBoardDTO(params, result)
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          result: DTO.result,
        })
      }
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    const boardCode = req.params.boardCode
    const params = new ToServiceBoardCodeParams(boardCode)
    try {
      await this.boardService.removeBoard(params)
      res.json({
        boardCode,
        HTTPmethod: req.method,
        message: 'DELETE board success',
      })
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }

  async postViewBoard(req, res, next) {
    const boardCode = req.params.boardCode
    const ip = req.clientIp
    try {
      const params = new ToServiceViewBoardParams(boardCode, ip)
      const result = await this.boardService.viewBoard(params)
      if (result) {
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          message: 'Add view success',
        })
      } else {
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          message: 'Add view fail',
        })
      }
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }

  async postRecommendBoard(req, res, next) {
    const boardCode = req.params.boardCode
    const userCode = req.body.userCode
    const ip = req.clientIp
    try {
      const params = new ToServiceRecommendBoardParams(boardCode, userCode, ip)
      const result = await this.boardService.recommendBoard(params)
      if (result) {
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          message: 'Add recommend success',
        })
      } else {
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          message: 'Add recommend fail',
        })
      }
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }
}

export default BoardController
