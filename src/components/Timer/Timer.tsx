import { useEffect, useState } from "react";
import { useParseDate } from "../../hooks/useParseDate";
import { Week } from "../../models/Week";
import styles from "./Timer.module.css";

interface IProps { 
	rawTargetDate: string 
}

export default function Timer({ rawTargetDate }: IProps) {
	const [difference, setDifference] = useState<number>(0)
	const timerValue = useParseDate(difference)
	
	const targetDayId = Week.getIdByName(rawTargetDate)
	const [targetHour, targetMinute] = [+rawTargetDate.substring(3, 5), +rawTargetDate.substring(6, 8)]

	const getDayOffset = (today: number, target: number) => {
		return (target - 1 + today) % 7
	}

	// calculate diffenence betwen now and taget unix time
	useEffect(() => {
		const currentDate = new Date()
		const targetDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate() + getDayOffset(currentDate.getDate(), targetDayId),
			targetHour,
			targetMinute,
			0
		)
		
		const targetUnixDate = Math.round(targetDate.getTime() / 1000)
		const currentUnixDate = Math.round(Date.now() / 1000)
		
		setDifference(targetUnixDate - currentUnixDate)
	}, [])

useEffect(() => {
	const interval = setInterval(() => {
		setDifference((prevDiff: number) => prevDiff - 1)
	}, 1000)
	
	return () => clearInterval(interval)
}, [])

	return (
		<h1 className={styles.timer}>
			{timerValue}<br/>
		</h1>
	)
}