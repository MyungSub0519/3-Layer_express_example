// DTO
export class ModelSelectAccountDTO {
  constructor(user_code, email, password, user_nickname, is_delete) {
    this.userCode = user_code
    this.email = email
    this.password = password
    this.userNickname = user_nickname
    this.isDelete = is_delete
  }
}

export class ModelSelectAccountByIdDTO {
  constructor(user_code, email, password, user_nickname, is_delete) {
    this.userCode = user_code
    this.email = email
    this.password = password
    this.userNickname = user_nickname
    this.isDelete = is_delete
  }
}

export class ModelUpdateAccountDTO {
  constructor(user_code, email, password, user_nickname, is_delete) {
    this.userCode = user_code
    this.email = email
    this.password = password
    this.userNickname = user_nickname
    this.isDelete = is_delete
  }
}

export class ModelLoginAccountDTO {
  constructor(email, password) {
    this.email = email
    this.password = password
  }
}
