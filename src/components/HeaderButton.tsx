import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectDay } from "../redux/reducers/UISlice";
import styles from './Header/Header.module.css';

interface IProps {
	id: number,
	children?: string,
}

export default function HeaderButton({id, children}: IProps) {
	const dispatch = useAppDispatch()
	const { selectedDay, today} = useAppSelector(state => state.UIReducer)
	const isDayEmpty = useAppSelector(state => state.cardsReducer.distributedData[id].length === 0) 

	const classNames = `
		${selectedDay == id ? styles.is_selected : ''} 
		${today == id ? styles.is_today : ''}
		${isDayEmpty ? styles.is_empty : ''}
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