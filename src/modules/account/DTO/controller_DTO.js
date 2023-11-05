// DTO
export class ResponseGetAccountsDTO {
  constructor(userCode, email, password, userNickname, isDelete) {
    this.userCode = userCode
    this.email = email
    this.password = password
    this.userNickname = userNickname
    this.isDelete = isDelete
  }
}

export class ResponseGetAccountByIdDTO {
  constructor(userCode, email, password, userNickname, isDelete) {
    this.userCode = userCode
    this.email = email
    this.password = password
    this.userNickname = userNickname
    this.isDelete = isDelete
  }
}

export class ResponsePutAccountDTO {
  constructor(changeInfo, result) {
    this.userCode = result.userCode
    this.userNickname = result.userNickname
    this.isDelete = result.isDelete
    this.beforeAccount = {
      email: result.email,
      password: result.password,
    }
    this.afterAccount = {
      email: changeInfo.email,
      password: changeInfo.password,
    }
  }
}

export class AccountPostLoginDTO {
  constructor(email, password) {
    this.email = email
    this.password = password
  }
}

// params

export class ToServiceLoginAccountParams {
  constructor(userCode, email, password) {
    this.userCode = userCode
    this.email = email
    this.password = password
  }
}

export class ToServiceEditAccountParams {
  constructor(userCode, email, password) {
    this.userCode = userCode
    this.email = email
    this.password = password
  }
}

export class ToSerivceAccountCodeParams {
  constructor(userCode) {
    this.userCode = userCode
  }
}
