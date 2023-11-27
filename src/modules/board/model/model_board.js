import { isEmpty } from '../../../lib/utils.js'
import {
  ModelSelectBoardsDTO,
  ModelSelectBoardByIdDTO,
  ModelUpdateBoardDTO,
  ModelRecommendBoardDTO,
  ModelViewBoardDTO,
} from '../DTO/model_DTO.js'
import { BoardViewLog, BoardRecommendLog } from '../../../database/MongoDB_database_connect.js'

class BoardModel {
  constructor(dataBase) {
    this.dataBase = dataBase
  }

  async selectBoards(params) {
    let sql = `SELECT board_code, title, content, boards.user_code, user_nickname, boards.category_code, category_name, write_time, update_time, views, recommend 
                 FROM boards 
                      LEFT OUTER JOIN users 
                      ON boards.user_code = users.user_code 
            
                      LEFT OUTER JOIN category 
                      ON boards.category_code = category.category_code 
                WHERE boards.is_delete = 0`

    const conditions = []

    if (params.title || params.content || params.userCode || params.categoryCode || params.userNickname) sql += ' AND'
    if (params.title) conditions.push(`title LIKE '%${params.title}%'`)
    if (params.content) conditions.push(`content LIKE '%${params.content}%'`)
    if (params.userCode) conditions.push(`boards.user_code = ${params.userCode}`)
    if (params.userNickname) conditions.push(`user_nickname = '${params.userNickname}'`)
    if (params.categoryCode) conditions.push(`boards.category_code = ${params.categoryCode}`)
    if (params.categoryName) conditions.push(`category_name = '${params.categoryName}'`)
    if (conditions.length > 0) sql += ` ${conditions.join(' AND ')}`

    const [result] = await this.dataBase.query(sql)
    const DTO = result.map(
      ({
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
      }) =>
        new ModelSelectBoardsDTO(
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
        ),
    )
    return DTO
  }

  async insertBoard(params) {
    const sql = `INSERT INTO boards (title, content, user_code, category_code) 
                 VALUES (?, ?, ?, ?)`
    await this.dataBase.query(sql, [params.title, params.content, params.userCode, params.categoryCode])
  }

  async selectBoardById(params) {
    const sql = `SELECT board_code, title, content, user_nickname, category_name, write_time, update_time, views, recommend, boards.is_delete 
                   FROM boards 
                        LEFT OUTER JOIN users 
                        ON boards.user_code = users.user_code 
                       
                        LEFT OUTER JOIN category 
                        ON boards.category_code = category.category_code 
                  WHERE board_code = ? AND users.is_delete = 0`
    const [result] = await this.dataBase.query(sql, [params.boardCode])
    if (isEmpty(result)) return null
    const DTO = new ModelSelectBoardByIdDTO(
      result[0].board_code,
      result[0].title,
      result[0].content,
      result[0].user_nickname,
      result[0].category_name,
      result[0].write_time,
      result[0].update_time,
      result[0].views,
      result[0].recommend,
      result[0].is_delete,
    )
    return DTO
  }

  async updateBoard(params) {
    const sql = `SELECT board_code, title, content, user_nickname, boards.category_code, category_name, write_time 
                   FROM boards 
                        LEFT OUTER JOIN users 
                        ON boards.user_code = users.user_code 

                        LEFT OUTER JOIN category 
                        ON boards.category_code = category.category_code 
                  WHERE board_code = ?`

    const sql2 = `UPDATE boards 
                     SET title = ?, content = ?, category_code = ?, update_time = NOW() 
                   WHERE board_code = ?`

    const [boardOriginalResult] = await this.dataBase.query(sql, [params.boardCode])

    if (isEmpty(boardOriginalResult)) return null
    if (isEmpty(params.title)) params.title = boardOriginalResult[0].title
    if (isEmpty(params.content)) params.content = boardOriginalResult[0].content
    if (isEmpty(params.categoryCode)) params.categoryCode = boardOriginalResult[0].category_code

    await this.dataBase.query(sql2, [params.title, params.content, params.categoryCode, params.boardCode])

    const DTO = new ModelUpdateBoardDTO(
      boardOriginalResult[0].board_code,
      boardOriginalResult[0].title,
      boardOriginalResult[0].content,
      boardOriginalResult[0].user_nickname,
      boardOriginalResult[0].category_code,
      boardOriginalResult[0].category_name,
      boardOriginalResult[0].write_time,
    )
    return DTO
  }

  async deleteBoard(params) {
    const sql = `UPDATE boards 
                    SET is_delete = 1 
                  WHERE board_code = ?`
    await this.dataBase.query(sql, [params.boardCode])
  }

  async selectBoardViewer(params) {
    const result = await BoardViewLog.find({ boardCode: params.boardCode, userIp: params.ip })
    if (isEmpty(result)) return false
    else return true
  }

  async addViewBoard(params) {
    try {
      await BoardViewLog.create({
        boardCode: params.boardCode,
        userIp: params.ip,
      })
      return true
    } catch {
      return false
    }
  }

  async selectBoardRecommender(params) {
    const result = await BoardRecommendLog.find({ boardCode: params.boardCode, userIp: params.ip })
    if (isEmpty(result)) return false
    else return true
  }

  async addRecommendBoard(params) {
    try {
      await BoardRecommendLog.create({
        boardCode: params.boardCode,
        userCode: params.userCode,
        userIp: params.ip,
      })
      return true
    } catch {
      return false
    }
  }
}

export default BoardModel
