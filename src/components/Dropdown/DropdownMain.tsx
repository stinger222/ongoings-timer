import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as SignOutIcon } from "../../assets/sign-out.svg";

import { useAppDispatch } from "../../hooks/redux";
import { setActiveMenu } from "../../redux/reducers/headerReducer";
import { useNavigate } from "react-router-dom";

import styles from './Dropdown.module.css';
import { deauthorize } from "../../redux/reducers/authReducer";

export default function DropdownMain({ className }: any) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(deauthorize())
    navigate('/welcome')
  } 
  
  return <div className={`${className}`}>
    <h1 className={styles.header}>
      Options 
      <SignOutIcon
        className={styles.header_sign_out}
        onClick={handleLogOut}
        title="Sign out"
      />
    </h1>
		
		<div className={styles.dropdown_button} onClick={() => dispatch(setActiveMenu('add_card'))}>
			<PlusIcon className={styles.dropdown_button_icon}/>
				<span className={styles.dropdown_button_text}>
				New Card
			</span>
		</div>
		
		<div className={styles.dropdown_button} onClick={() => dispatch(setActiveMenu('trello_settings'))}>
			<SettingsIcon className={styles.dropdown_button_icon}/>
			<span className={styles.dropdown_button_text}>
				Trello Settings
			</span>
		</div>

  </div>
}
