// DTO
export class ServiceFindAccountsDTO {
  constructor(userCode, email, password, userNickname, isDelete) {
    this.userCode = userCode
    this.email = email
    this.password = password
    this.userNickname = userNickname
    this.isDelete = isDelete
  }
}

export class ServiceFindAccountByIdDTO {
  constructor(userCode, email, password, userNickname, isDelete) {
    this.userCode = userCode
    this.email = email
    this.password = password
    this.userNickname = userNickname
    this.isDelete = isDelete
  }
}

export class ServiceEditAccountDTO {
  constructor(userCode, email, password, userNickname, isDelete) {
    this.userCode = userCode
    this.email = email
    this.password = password
    this.userNickname = userNickname
    this.isDelete = isDelete
  }
}

export class ServiceLoginAccountDTO {
  constructor(email, password) {
    this.email = email
    this.password = password
  }
}

// params

export class ToModelUpdateAccountParams {
  constructor(userCode, email, password) {
    this.userCode = userCode
    this.email = email
    this.password = password
  }
}

export class ToModelAccountCodeParams {
  constructor(userCode) {
    this.userCode = userCode
  }
}

export class ToModelLoginAccountParams {
  constructor(userCode, email, password) {
    this.userCode = userCode
    this.email = email
    this.password = password
  }
}
