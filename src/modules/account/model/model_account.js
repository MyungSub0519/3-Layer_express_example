import { isEmpty } from '../../../lib/utils.js'
import {
  ModelSelectAccountDTO,
  ModelSelectAccountByIdDTO,
  ModelUpdateAccountDTO,
  ModelLoginAccountDTO,
} from '../DTO/model_DTO.js'

class AccountModel {
  constructor(dataBase) {
    this.dataBase = dataBase
  }

  async selectAccounts() {
    const sql = `SELECT * 
                   FROM users`
    const [result] = await this.dataBase.query(sql)
    const DTO = result.map(
      ({ user_code, email, password, user_nickname, is_delete }) =>
        new ModelSelectAccountDTO(user_code, email, password, user_nickname, is_delete),
    )
    return DTO
  }

  async selectAccountById(params) {
    const sql = `SELECT * 
                   FROM users 
                  WHERE user_code = ?`

    const [result] = await this.dataBase.query(sql, [params.userCode])
    if (isEmpty(result)) return null
    const DTO = new ModelSelectAccountByIdDTO(
      result[0].user_code,
      result[0].email,
      result[0].password,
      result[0].user_nickname,
      result[0].is_delete,
    )
    return DTO
  }

  async updateAccount(params) {
    const sql = `SELECT * 
                   FROM users 
                  WHERE user_code = ?`

    const sql2 = `UPDATE users 
                     SET email = ?, password = ? 
                   WHERE user_code = ?`

    const [accountOriginalResult] = await this.dataBase.query(sql, [params.userCode])

    if (isEmpty(accountOriginalResult)) return null
    if (isEmpty(params.email)) params.email = accountOriginalResult[0].email
    if (isEmpty(params.password)) params.password = accountOriginalResult[0].password

    await this.dataBase.query(sql2, [params.email, params.password, params.userCode])

    const DTO = new ModelUpdateAccountDTO(
      accountOriginalResult[0].user_code,
      accountOriginalResult[0].email,
      accountOriginalResult[0].password,
      accountOriginalResult[0].user_nickname,
      accountOriginalResult[0].is_delete,
    )
    return DTO
  }

  async loginAccount(params) {
    const sql = `SELECT email, password 
                     FROM users 
                    WHERE user_code = ?`
    const [result] = await this.dataBase.query(sql, [params.userCode])
    const DTO = new ModelLoginAccountDTO(result[0].email, result[0].password)
    return DTO
  }
}

export default AccountModel
