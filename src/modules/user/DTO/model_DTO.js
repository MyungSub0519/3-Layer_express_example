// DTO

export class ModelSelectUsersDTO {
  constructor(user_code, user_nickname) {
    this.userCode = user_code
    this.userNickname = user_nickname
  }
}

export class ModelSelectUserByIdDTO {
  constructor(user_nickname, board_code, title, is_delete) {
    this.userNickname = user_nickname
    this.boardCode = board_code
    this.title = title
    this.isDelete = is_delete
  }
}

export class ModelUserUpdateDTO {
  constructor(user_nickname) {
    this.userNickname = user_nickname
  }
}
