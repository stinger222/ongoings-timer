import { ITrelloCardData } from "../types/Trello"

export const getMockTrelloObject = () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  }
}

export enum TestDataVariant {
  RAW,
  PROCESSED,
  INVALID_RAW
}

// Returns an object with corresponding input & output card data. 
export const getTestCardData = (
  dayId: number = 0,
  variant: TestDataVariant = TestDataVariant.RAW
): any | ITrelloCardData => {

  const daysOfTheWeek: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  
  const dataVarants = {
    // Raw card response from Trello
    [TestDataVariant.RAW]: {
      "id": "15cacf61672c5796852e850",
      "badges": {
          "attachmentsByType": {
              "trello": {
                  "board": 0,
                  "card": 0
              }
          },
          "location": false,
          "votes": 0,
          "viewingMemberVoted": false,
          "subscribed": false,
          "fogbugz": "",
          "checkItems": 12,
          "checkItemsChecked": 4,
          "checkItemsEarliestDue": null,
          "comments": 0,
          "attachments": 0,
          "description": true,
          "due": null,
          "dueComplete": false,
          "start": null
      },
      "checkItemStates": [],
      "closed": false,
      "dueComplete": false,
      "dateLastActivity": "2023-08-02T21:49:26.061Z",
      "desc": "https://yummyani.me/catalog/item/reinkarnatsiya-bezrabotnogo-istoriya-priklyucheniyah-drugom-mire-chast-1?video=534100\nhttps://animego.org/upload/anime/images/64a1a7f30aefe207920191.jpg",
      "descData": {
          "emoji": {}
      },
      "due": null,
      "dueReminder": null,
      "email": null,
      "idBoard": "deb3a757fc37e0ha7aed27",
      "idChecklists": [
          "61cf425af76148f7ca71d5"
      ],
      "idList": "928l6d39g1308oab2728",
      "idMembers": [],
      "idMembersVoted": [],
      "idShort": 1341,
      "idAttachmentCover": null,
      "labels": [],
      "idLabels": [],
      "manualCoverAttachment": false,
      "name": `Mushoku Tensei II - ${daysOfTheWeek[dayId]} 19:00`,
      "pos": 409600,
      "shortLink": "Pq9fN37g",
      "shortUrl": "https://trello.com/c/Pq9fN37g",
      "start": null,
      "subscribed": false,
      "url": "https://trello.com/c/???/1234-mushoku-tensei-ii",
      "cover": {
          "idAttachment": null,
          "color": null,
          "idUploadedBackground": null,
          "size": "normal",
          "brightness": "dark",
          "idPlugin": null
      },
      "isTemplate": false,
      "cardRole": null
    } as any,
  
    // Result that should end up in the store
    [TestDataVariant.PROCESSED]: {
      checkItems: 12,
      checkItemsChecked: 4,
      checklistId: "61cf425af76148f7ca71d5",
      cardTitle: `Mushoku Tensei II - ${daysOfTheWeek[dayId]} 19:00`,
      cardDesc: "https://yummyani.me/catalog/item/reinkarnatsiya-bezrabotnogo-istoriya-priklyucheniyah-drugom-mire-chast-1?video=534100\nhttps://animego.org/upload/anime/images/64a1a7f30aefe207920191.jpg",
      cardUrl: "https://trello.com/c/???/1234-mushoku-tensei-ii",
      cardId: "15cacf61672c5796852e850",
      cardDayId: dayId
    } as ITrelloCardData,
    // Raw card response from Trello, but with invalid card name
    // (i.e without or with invalid postfix)
    [TestDataVariant.INVALID_RAW]: {
      "id": "15cacf61672c5796852e850",
      "badges": {
          "attachmentsByType": {
              "trello": {
                  "board": 0,
                  "card": 0
              }
          },
          "location": false,
          "votes": 0,
          "viewingMemberVoted": false,
          "subscribed": false,
          "fogbugz": "",
          "checkItems": 12,
          "checkItemsChecked": 4,
          "checkItemsEarliestDue": null,
          "comments": 0,
          "attachments": 0,
          "description": true,
          "due": null,
          "dueComplete": false,
          "start": null
      },
      "checkItemStates": [],
      "closed": false,
      "dueComplete": false,
      "dateLastActivity": "2023-08-02T21:49:26.061Z",
      "desc": "https://yummyani.me/catalog/item/reinkarnatsiya-bezrabotnogo-istoriya-priklyucheniyah-drugom-mire-chast-1?video=534100\nhttps://animego.org/upload/anime/images/64a1a7f30aefe207920191.jpg",
      "descData": {
          "emoji": {}
      },
      "due": null,
      "dueReminder": null,
      "email": null,
      "idBoard": "deb3a757fc37e0ha7aed27",
      "idChecklists": [
          "61cf425af76148f7ca71d5"
      ],
      "idList": "928l6d39g1308oab2728",
      "idMembers": [],
      "idMembersVoted": [],
      "idShort": 1341,
      "idAttachmentCover": null,
      "labels": [],
      "idLabels": [],
      "manualCoverAttachment": false,
      "name": `No Mushoku Tensei??)) - 19 00`,
      "pos": 409600,
      "shortLink": "Pq9fN37g",
      "shortUrl": "https://trello.com/c/Pq9fN37g",
      "start": null,
      "subscribed": false,
      "url": "https://trello.com/c/???/1234-mushoku-tensei-ii",
      "cover": {
          "idAttachment": null,
          "color": null,
          "idUploadedBackground": null,
          "size": "normal",
          "brightness": "dark",
          "idPlugin": null
      },
      "isTemplate": false,
      "cardRole": null
    } as any,

  }

  return dataVarants[variant]
}