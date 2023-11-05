// DTO
export class ServiceFindBoardsDTO {
  constructor(
    boardCode,
    title,
    content,
    userCode,
    userNickname,
    categoryCode,
    categoryName,
    writeTime,
    updateTime,
    views,
    recommend,
  ) {
    this.boardCode = boardCode
    this.title = title
    this.content = content
    this.userCode = userCode
    this.userNickname = userNickname
    this.categoryCode = categoryCode
    this.categoryName = categoryName
    this.writeTime = writeTime
    this.updateTime = updateTime
    this.views = views
    this.recommend = recommend
  }
}

export class ServiceFindBoardByIdDTO {
  constructor(
    boardCode,
    title,
    content,
    userNickname,
    categoryName,
    writeTime,
    updateTime,
    views,
    recommend,
    isDelete,
  ) {
    this.boardCode = boardCode
    this.title = title
    this.content = content
    this.userNickname = userNickname
    this.categoryName = categoryName
    this.writeTime = writeTime
    this.updateTime = updateTime
    this.views = views
    this.recommend = recommend
    this.isDelete = isDelete
  }
}

export class ServiceEditBoardDTO {
  constructor(boardCode, title, content, userNickname, categoryCode, categoryName, writeTime) {
    this.boardCode = boardCode
    this.title = title
    this.content = content
    this.userNickname = userNickname
    this.categoryCode = categoryCode
    this.categoryName = categoryName
    this.writeTime = writeTime
  }
}

export class ServiceRecommendBoardDTO {
  constructor(recommend) {
    this.recommend = recommend
  }
}

// params

export class ToModelBoardCodeParams {
  constructor(boardCode) {
    this.boardCode = boardCode
  }
}

export class ToModelSelectViewBoardParams {
  constructor(boardCode, ip) {
    this.boardCode = boardCode
    this.ip = ip
  }
}

export class ToModelSelectRecommendBoardParams {
  constructor(boardCode, userCode, ip) {
    this.boardCode = boardCode
    this.userCode = userCode
    this.ip = ip
  }
}

export class ToModelSelectBoardsParams {
  constructor(title, content, userCode, userNickname, categoryCode, categoryName) {
    this.title = title
    this.content = content
    this.userCode = userCode
    this.userNickname = userNickname
    this.categoryCode = categoryCode
    this.categoryName = categoryName
  }
}

export class ToModelInsertBoardParams {
  constructor(title, content, userCode, categoryCode) {
    this.title = title
    this.content = content
    this.userCode = userCode
    this.categoryCode = categoryCode
  }
}

export class ToModelUpdateBoardParams {
  constructor(title, content, boardCode, categoryCode) {
    this.title = title
    this.content = content
    this.boardCode = boardCode
    this.categoryCode = categoryCode
  }
}
