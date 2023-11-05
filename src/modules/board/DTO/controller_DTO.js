// DTO
export class ResponseGetBoardsDTO {
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

export class ResponseGetBoardByIdDTO {
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

export class ResponsePutBoardDTO {
  constructor(changeInfo, originalResult) {
    this.result = {
      boardCode: originalResult.boardCode,
      userNickname: originalResult.userNickname,
      beforeBoard: {
        title: originalResult.title,
        content: originalResult.content,
        categoryCode: originalResult.categoryCode,
        writeTime: originalResult.writeTime,
      },
      afterBoard: {
        title: changeInfo.title,
        content: changeInfo.content,
        categoryCode: changeInfo.categoryCode,
        updateTime: timeStamp(),
      },
    }
  }
}

export class ResponseRecommendBoard {
  constructor(boardCode, recommend) {
    this.result = {
      boardCode,
      boardBeforeRecommend: recommend,
      boardAfterRecommend: recommend + 1,
    }
  }
}

// params

export class ToServiceBoardCodeParams {
  constructor(boardCode) {
    this.boardCode = boardCode
  }
}

export class ToServiceFindBoardsParams {
  constructor(title, content, userCode, userNickname, categoryCode, categoryName) {
    this.title = title
    this.content = content
    this.userCode = userCode
    this.userNickname = userNickname
    this.categoryCode = categoryCode
    this.categoryName = categoryName
  }
}

export class ToServiceViewBoardParams {
  constructor(boardCode, ip) {
    this.boardCode = boardCode
    this.ip = ip
  }
}

export class ToServiceRecommendBoardParams {
  constructor(boardCode, userCode, ip) {
    this.boardCode = boardCode
    this.userCode = userCode
    this.ip = ip
  }
}

export class ToServiceCreateBoardParams {
  constructor(title, content, userCode, categoryCode) {
    this.title = title
    this.content = content
    this.userCode = userCode
    this.categoryCode = categoryCode
  }
}

export class ToServiceEditBoardParams {
  constructor(title, content, boardCode, categoryCode) {
    this.title = title
    this.content = content
    this.boardCode = boardCode
    this.categoryCode = categoryCode
  }
}

const timeStamp = () => {
  const today = new Date()
  today.setHours(today.getHours() + 9)
  return today.toISOString().replace('T', ' ').substring(0, 19)
}
