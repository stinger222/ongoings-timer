import { useAppDispatch } from "../../hooks/redux";
import { createCard } from "../../redux/reducers/cardsReducer";
import { setActiveMenu } from "../../redux/reducers/headerReducer";

import { Trello, storageKeys } from "../../constants/constants";
import { processTitle } from "../../utils/stringUtils";
import { INewCardData, INewCardForm } from "../../types/Trello";

import { ReactComponent as BackIcon } from "../../assets/back.svg";

import styles from './Dropdown.module.css';
import AddCardForm from "./AddCardForm";

const getNewCardData = ({
  title, day, time, length, watched, player_url, thumbnail_url
}: INewCardForm): INewCardData => {
  const name = `${processTitle(title)} - ${day} ${time}`
  const desc = player_url + "\n" + thumbnail_url
  const selectedList = localStorage.getItem(storageKeys.selectedList)

  if (!selectedList) {
    throw new Error('Can\'t find selected list to create card')
  }

  const idList = JSON.parse(selectedList).id
  
  return {
    name, desc, idList, pos: "bottom", length, watched
  }
}

export default function DropdownAddCard({ className }: { className: string }) {
  const dispatch = useAppDispatch()

  const handleSubmit = (formValues) => {
    const newCardData: INewCardData = getNewCardData(formValues)
    dispatch(createCard({ newCard: newCardData, Trello }))
  }

  return <div className={`${className}`}>
    <h1 className={styles.header}>  
    	<BackIcon
        className={styles.header_back}
        onClick={() => dispatch(setActiveMenu('main'))}
      />
      Add New Card  
    </h1>

		<AddCardForm handleSubmit={handleSubmit}/>
  </div>
}
