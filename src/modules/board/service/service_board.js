import { ValidationError } from "../../../error/error.js";
import { isEmpty } from "../../../lib/utils.js";
import {
  ToModelSelectBoardsParams,
  ServiceFindBoardsDTO,
  ToModelInsertBoardParams,
  ServiceFindBoardByIdDTO,
  ServiceEditBoardDTO,
  ToModelUpdateBoardParams,
  ToModelBoardCodeParams,
  ToModelSelectViewBoardParams,
  ToModelSelectRecommendBoardParams,
} from "../DTO/service_DTO.js";

class BoardService {
  constructor(boardModel) {
    this.boardModel = boardModel;
  }

  async findBoards(params) {
    const toModelParams = new ToModelSelectBoardsParams(
      params.title,
      params.content,
      params.userCode,
      params.userNickname,
      params.categoryCode,
      params.categoryName
    );
    const result = await this.boardModel.selectBoards(toModelParams);
    const DTO = result.map(
      ({
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
      }) =>
        new ServiceFindBoardsDTO(
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
          recommend
        )
    );
    return DTO;
  }

  async createBoard(params) {
    if (
      isEmpty(params.title) ||
      isEmpty(params.content) ||
      isEmpty(params.userCode) ||
      isEmpty(params.categoryCode)
    ) {
      throw new ValidationError();
    } else {
      const toModelParams = new ToModelInsertBoardParams(
        params.title,
        params.content,
        params.userCode,
        params.categoryCode
      );
      await this.boardModel.insertBoard(toModelParams);
    }
  }

  async findBoardById(params) {
    const toModelParams = new ToModelBoardCodeParams(params.boardCode);
    const result = await this.boardModel.selectBoardById(toModelParams);
    if (isEmpty(result)) return null;
    const DTO = new ServiceFindBoardByIdDTO(
      result.boardCode,
      result.title,
      result.content,
      result.userNickname,
      result.categoryName,
      result.writeTime,
      result.updateTime,
      result.views,
      result.recommend,
      result.isDelete
    );
    return DTO;
  }

  async editBoard(params) {
    const toModelParams = new ToModelUpdateBoardParams(
      params.title,
      params.content,
      params.boardCode,
      params.categoryCode
    );
    const result = await this.boardModel.updateBoard(toModelParams);
    if (isEmpty(result)) return null;
    const DTO = new ServiceEditBoardDTO(
      result.boardCode,
      result.title,
      result.content,
      result.userNickname,
      result.categoryCode,
      result.categoryName,
      result.writeTime
    );
    return DTO;
  }

  async removeBoard(params) {
    if (isEmpty(params.boardCode)) {
      throw new ValidationError();
    } else {
      const toModelParams = new ToModelBoardCodeParams(params.boardCode);
      await this.boardModel.deleteBoard(toModelParams);
    }
  }

  async viewBoard(params) {
    if (isEmpty(params.boardCode, params.ip)) {
      throw new ValidationError();
    } else {
      const toModelParams = new ToModelSelectViewBoardParams(
        params.boardCode,
        params.ip
      );
      const result = await this.boardModel.selectBoardViewer(toModelParams);
      if (result) return false;
      else {
        await this.boardModel.addViewBoard(toModelParams);
        return true;
      }
    }
  }

  async recommendBoard(params) {
    if (isEmpty(params.boardCode) || isEmpty(params.ip)) {
      throw new ValidationError();
    } else {
      const toModelParams = new ToModelSelectRecommendBoardParams(
        params.boardCode,
        params.userCode,
        params.ip
      );
      const result =
        await this.boardModel.selectBoardRecommender(toModelParams);
      if (result) return false;
      else {
        await this.boardModel.addRecommendBoard(toModelParams);
        return true;
      }
    }
  }
}

export default BoardService;
