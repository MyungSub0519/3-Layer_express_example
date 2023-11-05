// DTO

export class ServiceFindUsersDTO {
  constructor(userCode, userNickname) {
    this.userCode = userCode
    this.userNickname = userNickname
  }
}

export class ServiceFindUserByIdDTO {
  constructor(userNickname, boardCode, title, isDelete) {
    this.userNickname = userNickname
    this.boardCode = boardCode
    this.title = title
    this.isDelete = isDelete
  }
}

export class ServiceEditUserDTO {
  constructor(userNickname) {
    this.userNickname = userNickname
  }
}

// params

export class ToModelInsertUserParams {
  constructor(email, password, nickname) {
    this.email = email
    this.password = password
    this.nickname = nickname
  }
}

export class ToModelUserCodeParams {
  constructor(userCode) {
    this.userCode = userCode
  }
}

export class ToModelUpdateUserParams {
  constructor(userCode, changeNickname) {
    this.userCode = userCode
    this.changeNickname = changeNickname
  }
}
