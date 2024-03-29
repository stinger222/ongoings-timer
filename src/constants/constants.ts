import { RootState } from "../redux/store"
import { getMockTrelloObject } from "../utils/testUtils"

const __TESTING__ = process.env.NODE_ENV === 'test'

export const Trello = __TESTING__ ? getMockTrelloObject() : globalThis.Trello

export const storageKeys = {
	selectedBoard: "selectedBoard",
	selectedList: "selectedList"
}

export const mockRootState: RootState = {
  authReducer: {
    isAuthorized: false,
    trelloToken: null,
    trelloKey: null,
    trelloBoards: null,
    selectedBoard: null,
    selectedBoardLists: null,
    selectedList: null
  },
  cardsReducer: {
    isPending: false,
    distributedData: [[], [], [], [], [], [], []]
  },
  UIReducer: {
    selectedDay: 3,
    today: 3,
    isDropdownOpen: false,
    dropdownActiveMenu: 'main'
  }
}


export const mockDestributedData = [
	[], [
		{
			checkItems: 99,
			checkItemsChecked: 80,
			checklistId: "sldfsdfkfjs#d(*98342",
			cardName: "TEST CARD - Пн 12:09",
			cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
			cardUrl: "Trello card url here",
			cardId: "sdlkfjвsdf290dsавsdfflkj234",
			cardDayId: 1
		}
	], [
		{
			checkItems: 99,
			checkItemsChecked: 80,
			checklistId: "sldfsdfkfjs#d(*98342",
			cardName: "TEST CARD - Вт 12:09",
			cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
			cardUrl: "Trello card url here",
			cardId: "sdlkывааfsdfjsdf29а0dssdfflkj234",
			cardDayId: 2
		}
	], [
		{
			checkItems: 99,
			checkItemsChecked: 80,
			checklistId: "sldfsdfkfjs#d(*98342",
			cardName: "TEST CARD - Ср 12:09",
			cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
			cardUrl: "Trello card url here",
			cardId: "sdlkfjвsdf29а0dssdfsdflkj234",
			cardDayId: 3
		},
		{
			checkItems: 99,
			checkItemsChecked: 80,
			checklistId: "sldfsdfkfjs#d(*98342",
			cardName: "TEST CARD - Ср 12:09",
			cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nposts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
			cardUrl: "Trello card url here",
			cardId: "sdlkfjвsdf29а0dsvsddfsflkj234",
			cardDayId: 3
		},
		{
			checkItems: 99,
			checkItemsChecked: 80,
			checklistId: "sldfsdfkfjs#d(*98342",
			cardName: "TEST CARD - Ср 12:09",
			cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
			cardUrl: "Trello card url here",
			cardId: "sdlkfjвssdf29а0sdfdsdfsflkj234",
			cardDayId: 3
		},
		{
			checkItems: 99,
			checkItemsChecked: 80,
			checklistId: "sldfsdfkfjs#d(*98342",
			cardName: "TEST CARD - Ср 12:09",
			cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
			cardUrl: "Trello card url here",
			cardId: "sdlkfjвsdf29а0dsdfsfflkj234",
			cardDayId: 3
		},
		
	], [{
		checkItems: 99,
		checkItemsChecked: 80,
		checklistId: "sldfsdfkfjs#d(*98342",
		cardName: "TEST CARD - Чт 12:09",
		cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
		cardUrl: "Trello card url here",
		cardId: "sdlksdffjыsdsfва290dsflkj234",
		cardDayId: 4
	}], [{
		checkItems: 99,
		checkItemsChecked: 80,
		checklistId: "sldfsdfkfjs#d(*98342",
		cardName: "TEST CARD - Пт 12:09",
		cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
		cardUrl: "Trello card url here",
		cardId: "sdlkfjsdf29вав0dssdfsdfflkj234",
		cardDayId: 5
	}], 
	[{
		checkItems: 99,
		checkItemsChecked: 80,
		checklistId: "sldfsdfkfjs#d(*98342",
		cardName: "TEST CARD - Сб 12:09",
		cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
		cardUrl: "Trello card url here",
		cardId: "sdlkfjsdf2вав9sdf0dsflkj234",
		cardDayId: 6
	},
	{
		checkItems: 99,
		checkItemsChecked: 80,
		checklistId: "sldfsdfkfjs#d(*98342",
		cardName: "TEST CARD - Сб 20:00",
		cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
		cardUrl: "Trello card url here",
		cardId: "sdlkfjsdf2вавsdf90dsflkj234",
		cardDayId: 6
	}]
]
