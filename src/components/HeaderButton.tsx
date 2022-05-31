import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectDay } from "../redux/reducers/headerReducer";
import styles from './Header/Header.module.css';

interface IHeaderButtonProps {
	id: number,
	children?: React.ReactNode,
} 

export default function HeaderButton({id, children}: IHeaderButtonProps) {

	const { selectedDay, today} = useAppSelector(state => state.headerReducer)
	const dispatch = useAppDispatch()

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
