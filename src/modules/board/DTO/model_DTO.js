// DTO
export class ModelSelectBoardsDTO {
  constructor(
    board_code,
    title,
    content,
    user_code,
    user_nickname,
    category_code,
    category_name,
    write_time,
    update_time,
    views,
    recommend,
  ) {
    this.boardCode = board_code
    this.title = title
    this.content = content
    this.userCode = user_code
    this.userNickname = user_nickname
    this.categoryCode = category_code
    this.categoryName = category_name
    this.writeTime = write_time
    this.updateTime = update_time
    this.views = views
    this.recommend = recommend
  }
}

export class ModelSelectBoardByIdDTO {
  constructor(
    board_code,
    title,
    content,
    user_nickname,
    category_name,
    write_time,
    update_time,
    views,
    recommend,
    is_delete,
  ) {
    this.boardCode = board_code
    this.title = title
    this.content = content
    this.userNickname = user_nickname
    this.categoryName = category_name
    this.writeTime = write_time
    this.updateTime = update_time
    this.views = views
    this.recommend = recommend
    this.isDelete = is_delete
  }
}

export class ModelUpdateBoardDTO {
  constructor(board_code, title, content, user_nickname, category_code, category_name, write_time) {
    this.boardCode = board_code
    this.title = title
    this.content = content
    this.userNickname = user_nickname
    this.categoryCode = category_code
    this.categoryName = category_name
    this.writeTime = write_time
  }
}

export class ModelViewBoardDTO {
  constructor(result) {
    this.boardCode = result[0].boardCode
    this.userIpList = result.map(({ userIp }) => userIp)
  }
}

export class ModelRecommendBoardDTO {
  constructor(result) {
    this.boardCode = result[0].boardCode
    this.userCodeList = result.map(({ userCode }) => userCode)
    this.userIpList = result.map(({ userIp }) => userIp)
  }
}
