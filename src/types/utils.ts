// All Comments supposed to go here as well, but it's just refuses to work
// no matter what the syntax is, so types of all utilities goes here
// and all comments will be on top of implementations themselves

import { ITrelloBoard, ITrelloList } from "./Trello"


// Date&Time-related:

export interface IWeek {
  readonly daysAbbr: string[]
  getIdByAbbr(abbr: string): number,
  getIdByCardName(name: string): number,
}

export interface IFormatTimeDuration {
  (difference: number): string
}

// String-related:

export interface IExtractDayAndTime {
  (cardName: string): [string, string, number, number]
}

export interface ICheckCardSuitability {
  (cardName: string): boolean
}

export interface IProcessCardTitle {
  (cardTitle: string): string
}

// Redux-related:

export interface ICreateCheckItems {
  (checklistId: string, checkItemsCount: number): Promise<void>
}

export interface ICompleteCheckItems {
  (checklistId: string, cardId: string, toCheck: number): Promise<void>
}

export interface ICreateChecklist {
  (cardId: string, checklistName: string, length: number, toCheck: number): Promise<void>
}

export interface IAuthState {
  isAuthorized: boolean,
  trelloToken: string | null,
  trelloKey: string | null,
	trelloBoards: any[] | null,
	selectedBoard: ITrelloBoard | null,
	selectedBoardLists: ITrelloList[] | null
	selectedList: ITrelloList | null
}
