import { ValidationError } from '../../../error/error.js'
import { isEmpty } from '../../../lib/utils.js'
import {
  ServiceFindAccountsDTO,
  ServiceFindAccountByIdDTO,
  ToModelAccountCodeParams,
  ServiceEditAccountDTO,
  ToModelUpdateAccountParams,
  ToModelLoginAccountParams,
} from '../DTO/Service_DTO.js'

class AccountService {
  constructor(accountModel) {
    this.accountModel = accountModel
  }

  async findAccounts() {
    const result = await this.accountModel.selectAccounts()
    const DTO = result.map(
      ({ userCode, email, password, userNickname, isDelete }) =>
        new ServiceFindAccountsDTO(userCode, email, password, userNickname, isDelete),
    )
    return DTO
  }

  async findAccountById(params) {
    const toModelParams = new ToModelAccountCodeParams(params.userCode)
    const result = await this.accountModel.selectAccountById(toModelParams)
    if (isEmpty(result)) return null
    const DTO = new ServiceFindAccountByIdDTO(
      result.userCode,
      result.email,
      result.password,
      result.userNickname,
      result.isDelete,
    )
    return DTO
  }

  async editAccount(params) {
    const toModelParams = new ToModelUpdateAccountParams(params.userCode, params.email, params.password)
    const result = await this.accountModel.updateAccount(toModelParams)
    if (isEmpty(result)) return null
    const DTO = new ServiceEditAccountDTO(
      result.userCode,
      result.email,
      result.password,
      result.userNickname,
      result.isDelete,
    )
    return DTO
  }

  async loginAccount(params) {
    if (isEmpty(params.email) || isEmpty(params.password)) {
      throw new ValidationError()
    } else {
      try {
        const toModelParams = new ToModelLoginAccountParams(params.userCode, params.email, params.password)
        const result = await this.accountModel.loginAccount(toModelParams)
        if (result.email == params.email && result.password == params.password) {
          return true
        } else {
          return false
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export default AccountService
