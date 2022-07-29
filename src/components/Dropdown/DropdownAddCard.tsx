import { useAppDispatch } from "../../hooks/redux";
import { setActiveMenu } from "../../redux/reducers/headerReducer";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import styles from './Dropdown.module.css';

export default function DropdownMain({ className }: any) {
  const dispatch = useAppDispatch()

  return <div className={`${className}`}>
    <h1 className={styles.header}>  
    	<BackIcon
        className={styles.header_back}
        onClick={() => dispatch(setActiveMenu('main'))}
      />
      Add New Card  
    </h1>

		<form className={styles.body}> 
      <div className={styles.dropdown_row}>
        <input className={styles.dropdown_input} placeholder="Card Title"></input>
      </div>

      <div className={styles.dropdown_row}>
        <select>
          <option>Mon</option>
          <option>Tue</option>
          <option>Wen</option>
          <option>Thu</option>
          <option>Fri</option>
          <option>Sat</option>
          <option>Sun</option>
        </select>
        <input className={styles.dropdown_input} type="time"></input>
      </div>

      <div className={styles.dropdown_row}>
        <input className={styles.dropdown_input} placeholder="Length"></input>
        <input className={styles.dropdown_input} placeholder="Watched"></input>
      </div>

      <div className={styles.dropdown_row}>
        <input className={styles.dropdown_input} placeholder="Player url"></input>
      </div>

      <div className={styles.dropdown_row}>
        <input className={styles.dropdown_input} placeholder="Thumbnail url"></input>
      </div>

      <div className={styles.dropdown_button}>
        Create
      </div>
		</form>
  </div>
}
