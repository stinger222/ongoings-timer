import { useSelector } from 'react-redux'
import HeaderButton from '../HeaderButton'
import styles from './Header.module.css'

export default function Header() {

	const { selectedDay } = useSelector((state:any) => state.headerReducer)

	return (
		<header className={styles.header}>
			<div className="container">
				<nav className={styles.navbar}>
					<HeaderButton id="1">
						Пн
					</HeaderButton>
					<HeaderButton id="2">
						Вт
					</HeaderButton>
					<HeaderButton id="3">
						Ср
					</HeaderButton>
					<HeaderButton id="4">
						Чт
					</HeaderButton>
					<HeaderButton id="5">
						Пт
					</HeaderButton>
					<HeaderButton id="6">
						Сб
					</HeaderButton>
					<HeaderButton id="0">
						Вс
					</HeaderButton>
					<div className={styles.settings_icon}></div>
				</nav>
			</div>
			<h1>Selected Day ID: {selectedDay}</h1>
			{/* Link to=settings > settings icon */}
		</header>
	)
}
