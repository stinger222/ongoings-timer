import { INewCardData, ITrelloCardData } from "./Trello";

// CardsReducer:

export interface ICardsReducerState {
	distributedData: Array<Array<ITrelloCardData>> | [],
	isPending: boolean
}

export interface ICreateCardThunkProps {
  newCard: INewCardData,
  Trello: any
}

export interface IRemoveCardThunkProps {
  cardToRemove: Pick<ITrelloCardData, "cardId" | "cardDayId">,
  Trello: any
}