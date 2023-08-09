import { INewCardData, ITrelloCardData } from "./Trello";

// CardsSlice:

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

// UISlice:

export type ActiveMenu = 'main' | 'trello_settings' | 'add_card'

export interface IUIState {
  selectedDay: number,
  today: number,
  isDropdownOpen: boolean,
  dropdownActiveMenu: ActiveMenu
}
