import { useAppDispatch } from "../../hooks/redux";
import { setActiveMenu } from "../../redux/reducers/headerReducer";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import styles from './Dropdown.module.css';
import { INewCardData, storageKeys } from "../../models/trelloModels";
import { cretaeCard } from "../../redux/reducers/cardsReducer";

const getNewCardData = ({
  title, day, time, length, watched, player_url, thumbnail_url
}: any): INewCardData => {
  const name = `${title} - ${day} ${time}`
  console.log('name:\n', name)
  
  const desc = player_url + "\n" + thumbnail_url
  console.log('desc:\n', desc)
  
  const selectedList = localStorage.getItem(storageKeys.selectedList)

  if (!selectedList) {
    throw new Error('Can\'t find selected list to create card')
  }

  const idList = JSON.parse(selectedList).id
  console.log('idList', idList);
  
  return {
    name, desc, idList, pos: "bottom", length, watched
  }
}

export default function DropdownAddCard({ className }: any) {
  const dispatch = useAppDispatch()

  const handleCardCreation = (e: any) => {
    e.preventDefault()
    const formData = {
      title: e.target.title.value,
      day: e.target.day.value,
      time: e.target.time.value,
      length: +e.target.length.value,
      watched: +e.target.watched.value,
      player_url: e.target.player_url.value,
      thumbnail_url: e.target.thumbnail_url.value
    }
    
    e.target.title.value = ''
    e.target.day.value = ''
    e.target.time.value = ''
    e.target.length.value = ''
    e.target.watched.value = ''
    e.target.player_url.value = ''
    e.target.thumbnail_url.value = ''
    

    const newCardData: INewCardData = getNewCardData(formData)
    
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

		<form className={styles.body} onSubmit={handleCardCreation}> 
      <div className={styles.dropdown_row}>
        <input className={styles.dropdown_input} id="title" placeholder="Card Title"></input>
      </div>

      <div className={styles.dropdown_row}>
        <select id="day">
          <option>Пн</option>
          <option>Вт</option>
          <option>Ср</option>
          <option>Чт</option>
          <option>Пт</option>
          <option>Сб</option>
          <option>Вс</option>
        </select>
        <input className={styles.dropdown_input} id="time" type="time"></input>
      </div>

      <div className={styles.dropdown_row}>
        <input className={styles.dropdown_input} id="length" placeholder="Length"></input>
        <input className={styles.dropdown_input} id="watched" placeholder="Watched"></input>
      </div>

      <div className={styles.dropdown_row}>
        <input className={styles.dropdown_input} id="player_url" placeholder="Player url"></input>
      </div>

      <div className={styles.dropdown_row}>
        <input className={styles.dropdown_input} id="thumbnail_url" placeholder="Thumbnail url"></input>
      </div>

      <button className={styles.dropdown_button} type="submit">
        Create
      </button>
		</form>
  </div>
}
