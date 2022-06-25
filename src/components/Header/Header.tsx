import { useAppSelector } from '../../hooks/redux'
import HeaderButton from '../HeaderButton'
import settingsIcon from '../../images/settings.svg'
import styles from './Header.module.css'

export default function Header() {
	const { selectedDay } = useAppSelector(state => state.headerReducer)
	
	return (
		<header className={styles.header}>
			<div className="container">
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

					{/* <img src={require('../../images/settings.svg').default} className={styles.settings_icon}  title="settings" /> */}

				</nav>
			</div>
			{/* <span>Selected Day ID: {selectedDay}</span> */}
		</header>
	)
}