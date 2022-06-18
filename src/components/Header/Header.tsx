import { useAppSelector } from '../../hooks/redux'
import { Link, useLocation} from 'react-router-dom'
import HeaderButton from '../HeaderButton'
import settingsIcon from '../../images/settings.svg'
import clockIcon from '../../images/clock.svg'
import styles from './Header.module.css'

export default function Header() {
	const { selectedDay } = useAppSelector(state => state.headerReducer)
	const location = useLocation()
	
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
					
					{
						location.pathname === "/" &&
							<Link to='/settings'>
								<img src={settingsIcon} className={styles.settings_icon}  title="settings" />
							</Link>
					}

					{
						location.pathname === "/settings" &&
							<Link to='/'>
								<img src={clockIcon} className={styles.settings_icon} title="tack page" />
							</Link>
					}
				</nav>
			</div>
			<span>Selected Day ID: {selectedDay}</span>
		</header>
	)
}