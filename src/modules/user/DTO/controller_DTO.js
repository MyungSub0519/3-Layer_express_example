// DTO

export class ResponseGetUsersDTO {
  constructor(userCode, userNickname) {
    this.userCode = userCode
    this.userNickname = userNickname
  }
}

export class ResponseGetUserByIdDTO {
  constructor(isDelete, result) {
    this.isDelete = isDelete
    this.result = {
      userNickname: result[0].userNickname,
      total_writing: result.length,
      writing: result.map((row) => ({
        boardCode: row.boardCode,
        title: row.title,
      })),
    }
  }
}

export class ResponsePutUserDTO {
  constructor(userCode, beforeUserNickname, afterUserNickname) {
    this.userCode = userCode
    this.beforeUserNickname = beforeUserNickname
    this.afterUserNickname = afterUserNickname
  }
}

// params

export class ToServiceCreateUserParams {
  constructor(email, password, nickname) {
    this.email = email
    this.password = password
    this.nickname = nickname
  }
}

export class ToServiceUserCodeParams {
  constructor(userCode) {
    this.userCode = userCode
  }
}

export class ToServiceEditUserParams {
  constructor(userCode, changeNickname) {
    this.userCode = userCode
    this.changeNickname = changeNickname
  }
}
