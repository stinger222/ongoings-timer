import HeaderButton from '../HeaderButton'
import Dropdown from '../Dropdown/Dropdown';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setDropdownState } from '../../redux/reducers/headerReducer';
import { ReactComponent as SettingsIcon } from "../../assets/settings-stroke.svg";
import styles from './Header.module.css'

export default function Header() {
  const dispatch = useAppDispatch()
  const isDropdownOpen = useAppSelector(state => state.headerReducer.isDropdownOpen)

	return (
		<header className={styles.header}>
				<nav className={styles.navbar}>
					<HeaderButton id={1}>
						Пн
					</HeaderButton>
					<HeaderButton id={2}>
						Вт
					</HeaderButton>
					<HeaderButton id={3}>
						Ср
					</HeaderButton>
					<HeaderButton id={4}>
						Чт
					</HeaderButton>
					<HeaderButton id={5}>
						Пт
					</HeaderButton>
					<HeaderButton id={6}>
						Сб
					</HeaderButton>
					<HeaderButton id={0}>
						Вс
					</HeaderButton>
				</nav>
        <SettingsIcon
          className={styles.settings_icon}
          onClick={() => dispatch(setDropdownState(!isDropdownOpen))}
        />

        {isDropdownOpen && 
          <Dropdown className={styles.dropdown}/>
        }
		</header>
	)
}