import { ValidationError } from '../../../error/error.js'
import { isEmpty } from '../../../lib/utils.js'
import {
  ResponseGetAccountByIdDTO,
  ResponseGetAccountsDTO,
  ResponsePutAccountDTO,
  ToSerivceAccountCodeParams,
  ToServiceEditAccountParams,
  ToServiceLoginAccountParams,
} from '../DTO/controller_DTO.js'

class AccountController {
  constructor(accountService) {
    this.accountService = accountService
  }

  async getAccounts(req, res, next) {
    try {
      const result = await this.accountService.findAccounts()
      const DTO = result.map(
        ({ userCode, email, password, userNickname, isDelete }) =>
          new ResponseGetAccountsDTO(userCode, email, password, userNickname, isDelete),
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

  async getAccountById(req, res, next) {
    const userCode = req.params.userCode
    try {
      const params = new ToSerivceAccountCodeParams(userCode)
      const result = await this.accountService.findAccountById(params)
      if (isEmpty(result)) {
        res.statusCode = 404
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          message: '존재하지 않는 사용자입니다.',
        })
      } else {
        const DTO = new ResponseGetAccountByIdDTO(
          result.userCode,
          result.email,
          result.password,
          result.userNickname,
          result.isDelete,
        )
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          result: DTO,
        })
      }
    } catch (error) {
      res.statusCode = 500
      next(error)
    }
  }

  async putAccount(req, res, next) {
    const userCode = req.params.userCode
    const email = req.body.email
    const password = req.body.password
    if (isEmpty(email) && isEmpty(password)) {
      res.statusCode = 400
      next(new ValidationError())
    } else {
      try {
        const params = new ToServiceEditAccountParams(userCode, email, password)
        const result = await this.accountService.editAccount(params)
        const DTO = new ResponsePutAccountDTO(params, result)
        res.json({
          HTTPmethod: req.method,
          HTTPstatusCode: res.statusCode,
          result: DTO,
          message: 'UPDATE account success',
        })
      } catch (error) {
        res.statusCode = 500
        next(error)
      }
    }
  }

  async postLoginAccount(req, res, next) {
    const userCode = req.params.userCode
    const email = req.body.email
    const password = req.body.password
    const params = new ToServiceLoginAccountParams(userCode, email, password)
    if (isEmpty(email) || isEmpty(password)) {
      res.statusCode = 400
      next(new ValidationError())
    } else {
      try {
        const result = await this.accountService.loginAccount(params)
        if (result) {
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            message: 'login success',
          })
        } else {
          res.json({
            HTTPmethod: req.method,
            HTTPstatusCode: res.statusCode,
            userCode,
            message: 'login fail',
          })
        }
      } catch (error) {
        res.statusCode = 500
        next(error)
      }
    }
  }

  postLogoutAccount(req, res) {
    const userCode = req.params.userCode
    res.json({
      HTTPmethod: req.method,
      HTTPstatusCode: res.statusCode,
      userCode,
      message: 'logout success',
    })
  }
}

export default AccountController
