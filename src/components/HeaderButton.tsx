import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectDay } from "../redux/reducers/headerReducer";
import styles from './Header/Header.module.css';

interface IHeaderButtonProps {
	id: number,
	children?: React.ReactNode,
}

export default function HeaderButton({id, children}: IHeaderButtonProps) {
	const dispatch = useAppDispatch()
	const { selectedDay, today} = useAppSelector(state => state.headerReducer)
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