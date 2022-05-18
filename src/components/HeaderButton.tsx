import { useDispatch, useSelector } from "react-redux";
import { selectDay } from "../redux/reducers/headerReducer";
import concatClassNames from "../utils/concatClassNames";
import styles from './Header/Header.module.css';

export default function HeaderButton({id, children}:any) {

	const { selectedDay, today} = useSelector((state:any) => state.headerReducer)
	const dispatch = useDispatch()

	const isSelectedClass = selectedDay == id ? styles.is_selected : ''
	const isTodayClass = today == id ? styles.is_today : ''
	const _className = concatClassNames(isSelectedClass, isTodayClass)

	const handleClick = () => {
		dispatch(selectDay(id))
	}
	

	return (
		<button onClick={handleClick} className={_className}>
			{children}
		</button>
	)
}
