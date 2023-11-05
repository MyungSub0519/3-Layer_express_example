import { isEmpty } from '../../../lib/utils.js'
import { ModelSelectUsersDTO, ModelSelectUserByIdDTO, ModelUserUpdateDTO } from '../DTO/model_DTO.js'

class UserModel {
  constructor(dataBase) {
    this.dataBase = dataBase
  }

  async selectUsers() {
    const sql = `SELECT user_code, user_nickname 
                   FROM users 
                  WHERE is_delete = 0`
    const [result] = await this.dataBase.query(sql)
    const DTO = result.map(({ user_code, user_nickname }) => new ModelSelectUsersDTO(user_code, user_nickname))
    return DTO
  }

  async insertUser(params) {
    const sql = `INSERT INTO users(email, password, user_nickname) 
                 VALUES (?, ?, ?)`
    await this.dataBase.query(sql, [params.email, params.password, params.nickname])
  }

  async selectUserById(params) {
    const sql = `SELECT user_nickname, board_code, title, users.is_delete 
                   FROM users 
                        LEFT OUTER JOIN boards 
                        ON users.user_code = boards.user_code AND boards.is_delete = 0 
                  WHERE users.user_code = ?`
    const [result] = await this.dataBase.query(sql, [params.userCode])
    const DTO = result.map(
      ({ user_nickname, board_code, title, is_delete }) =>
        new ModelSelectUserByIdDTO(user_nickname, board_code, title, is_delete),
    )
    return DTO
  }

  async updateUser(params) {
    const sql = `SELECT user_nickname 
                   FROM users 
                  WHERE user_code = ?; 

                 UPDATE users 
                    SET user_nickname = ? 
                  WHERE user_code = ?`
    const [result] = await this.dataBase.query(sql, [params.userCode, params.changeNickname, params.userCode])
    if (isEmpty(result[0])) return null
    const DTO = new ModelUserUpdateDTO(result[0][0].user_nickname)
    return DTO
  }

  async deleteUser(params) {
    const sql = `UPDATE users 
                    SET is_delete = 1 
                  WHERE user_code = ?`
    await this.dataBase.query(sql, [params.userCode])
  }
}

export default UserModel
