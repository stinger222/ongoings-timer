import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";

import { useAppDispatch } from "../../hooks/redux";
import { setActiveMenu } from "../../redux/reducers/headerReducer";

import styles from './Dropdown.module.css';

export default function DropdownMain({ className }: any) {

  const dispatch = useAppDispatch()
  
  return <div className={`${className}`}>
    <h1 className={styles.header}> Options </h1>
		
		<div className={styles.dropdown_item} onClick={() => dispatch(setActiveMenu('add_card'))}>
			<PlusIcon className={styles.dropdown_item_icon}/>
				<span className={styles.dropdown_item_text}>
				New Card
			</span>
		</div>
		
		<div className={styles.dropdown_item} onClick={() => dispatch(setActiveMenu('trello_settings'))}>
			<SettingsIcon className={styles.dropdown_item_icon}/>
			<span className={styles.dropdown_item_text}>
				Trello Settings
			</span>
		</div>

  </div>
}
