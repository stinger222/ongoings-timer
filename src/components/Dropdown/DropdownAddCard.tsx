import { useAppDispatch } from "../../hooks/redux";
import { cretaeCard } from "../../redux/reducers/cardsReducer";
import { setActiveMenu } from "../../redux/reducers/headerReducer";
import { INewCardData, storageKeys } from "../../models/trelloModels";

import { processTitle } from "../../utils/hepler";

import { ReactComponent as BackIcon } from "../../assets/back.svg";
import styles from './Dropdown.module.css';
import AddCardForm from "./AddCardForm";

const getNewCardData = ({
  title, day, time, length, watched, player_url, thumbnail_url
}: any): INewCardData => {
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

export default function DropdownAddCard({ className }: any) {
  const dispatch = useAppDispatch()

  const handleSubmit = (formValues: any) => {
    const newCardData: INewCardData = getNewCardData(formValues)
    dispatch(cretaeCard(newCardData))
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