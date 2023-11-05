import { ValidationError } from '../../../error/error.js'
import { isEmpty } from '../../../lib/utils.js'
import {
  ToServiceCreateUserParams,
  ToServiceUserCodeParams,
  ToServiceEditUserParams,
  ResponseGetUsersDTO,
  ResponseGetUserByIdDTO,
  ResponsePutUserDTO,
} from '../DTO/controller_DTO.js'

class UserController {
  constructor(userService) {
    this.userService = userService
  }

  async getUsers(req, res, next) {
    try {
      const result = await this.userService.findUsers()
      const DTO = result.map(({ userCode, userNickname }) => new ResponseGetUsersDTO(userCode, userNickname))
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

  async postUser(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    const nickname = req.body.nickname
    const params = new ToServiceCreateUserParams(email, password, nickname)
    if (isEmpty(email) || isEmpty(password) || isEmpty(nickname)) {
      next(new ValidationError())
    } else {
      try {
        await this.userService.createUser(params)
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          result: 'INSERT user success',
        })
      } catch (error) {
        res.statusCode = 500
        next(error)
      }
    }
  }

  async getUserById(req, res, next) {
    const userCode = req.params.userCode
    const params = new ToServiceUserCodeParams(userCode)
    try {
      const result = await this.userService.findUserById(params)
      if (isEmpty(result)) {
        res.statusCode = 404
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          result: '존재하지 않는 사용자입니다.',
        })
      } else {
        const DTO = new ResponseGetUserByIdDTO(result[0].isDelete, result)
        if (DTO.isDelete != 0) {
          res.statusCode = 404
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            result: '삭제된 사용자입니다.',
          })
        } else if (isEmpty(DTO.result.writing[0].boardCode)) {
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            result: {
              userNickname: DTO.result.userNickname,
              total_writing: 0,
            },
          })
        } else {
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            result: DTO.result,
          })
        }
      }
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }

  async putUser(req, res, next) {
    const userCode = req.params.userCode
    const changeNickname = req.body.changeNickname
    if (isEmpty(changeNickname)) {
      res.statusCode = 400
      next(new ValidationError())
    } else {
      try {
        const params = new ToServiceEditUserParams(userCode, changeNickname)
        const result = await this.userService.editUser(params)
        if (isEmpty(result)) {
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            message: '존재하지 않는 사용자입니다.',
          })
        } else {
          const DTO = new ResponsePutUserDTO(userCode, result.userNickname, changeNickname)
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            result: DTO,
            message: 'UPDATE user nickname success',
          })
        }
      } catch (error) {
        res.statusCode = 500
        next(error)
      }
    }
  }

  async deleteUser(req, res, next) {
    const userCode = req.params.userCode
    const params = new ToServiceUserCodeParams(userCode)
    try {
      await this.userService.removeUser(params)
      res.json({
        userCode,
        HTTPmethod: req.method,
        message: 'DELETE user success',
      })
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }
}

export default UserController
