import { isEmpty } from '../../../lib/utils.js'
import {
  ServiceFindUsersDTO,
  ServiceFindUserByIdDTO,
  ServiceEditUserDTO,
  ToModelInsertUserParams,
  ToModelUserCodeParams,
  ToModelUpdateUserParams,
} from '../DTO/service_DTO.js'
import { ValidationError } from '../../../error/error.js'

class UserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async findUsers() {
    const result = await this.userModel.selectUsers()
    const DTO = result.map(({ userCode, userNickname }) => new ServiceFindUsersDTO(userCode, userNickname))
    return DTO
  }

  async createUser(params) {
    if (isEmpty(params.email) || isEmpty(params.password) || isEmpty(params.nickname)) {
      throw new ValidationError()
    } else {
      const toModelParams = new ToModelInsertUserParams(params.email, params.password, params.nickname)
      await this.userModel.insertUser(toModelParams)
    }
  }

  async findUserById(params) {
    const toModelParams = new ToModelUserCodeParams(params.userCode)
    const result = await this.userModel.selectUserById(toModelParams)
    const DTO = result.map(
      ({ userNickname, boardCode, title, isDelete }) =>
        new ServiceFindUserByIdDTO(userNickname, boardCode, title, isDelete),
    )
    return DTO
  }

  async editUser(params) {
    if (isEmpty(params.userCode) || isEmpty(params.changeNickname)) {
      throw new ValidationError()
    } else {
      const toModelParams = new ToModelUpdateUserParams(params.userCode, params.changeNickname)
      const result = await this.userModel.updateUser(toModelParams)
      if (isEmpty(result)) return null
      const DTO = new ServiceEditUserDTO(result.userNickname)
      return DTO
    }
  }

  async removeUser(params) {
    if (isEmpty(params.userCode)) {
      throw new ValidationError()
    } else {
      const toModelParams = new ToModelUserCodeParams(params.userCode)
      await this.userModel.deleteUser(toModelParams)
    }
  }
}

export default UserService
