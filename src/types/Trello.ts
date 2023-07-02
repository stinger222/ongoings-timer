export interface ITrelloCardData {
	checkItems: number,
	checkItemsChecked: number,
	checklistId: string,
	cardTitle: string,
	cardDayId: number,
	cardDesc: string,
	cardUrl: string,
	cardId: string,
}

export interface ITrelloList{
	id: string,
	name: string
}

export interface ITrelloBoard{
	id: string,
	name: string
}

export interface INewCardData {
  name: string,
  desc: string,
  idList: string,
  pos?: 'top' | 'bottom',
  length: number,
  watched: number
}

export interface INewCardForm {
  title: string
  day: string
  time: string
  length: number
  watched: number
  player_url: string
  thumbnail_url: string
}
