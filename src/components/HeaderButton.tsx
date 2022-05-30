import { useDispatch, useSelector } from "react-redux";
import { selectDay } from "../redux/reducers/headerReducer";
import styles from './Header/Header.module.css';

export default function HeaderButton({id, children}:any) {

	const { selectedDay, today} = useSelector((state:any) => state.headerReducer)
	const dispatch = useDispatch()

	const classNames = `
		${selectedDay == id ? styles.is_selected : ''} 
		${today == id ? styles.is_today : ''}
	`

	const handleClick = () => {
		dispatch(selectDay(id))
	}
	
	return (
		<button onClick={handleClick} className={classNames}>
			{children}
		</button>
	)
}
