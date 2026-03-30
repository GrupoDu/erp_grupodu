import type TrelloNodeApi from "trello-node-api/index.js";
import dotenv from "dotenv";
import type { ITrelloCard } from "../types/trelloCard.interface.js";
dotenv.config();

/**
 * Service responsável por criar cards no trello
 * @see https://github.com/andrewdavies/trello-node-api
 * @method createFeedbackCard
 */
class FeedbackService {
  private trello: TrelloNodeApi;

  constructor(trello: TrelloNodeApi) {
    this.trello = trello;
  }

  // async getAllLists() {
  //   const ListID = process.env.TRELLO_LIST_ID || "";
  //   const boardID = process.env.TRELLO_BOARD_ID || "";

  //   const lists = await this.trello.board.searchLists(boardID);
  //   return lists;
  // }

  async createFeedbackCard(card_name: string, card_description: string) {
    const newCard = (await this.trello.card.create({
      name: card_name,
      desc: `## Descrição da issue\n ${card_description}`,
      idList: process.env.TRELLO_LIST_ID,
    })) as ITrelloCard;

    return newCard;
  }
}

export default FeedbackService;
