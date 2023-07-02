import { useEffect, useState } from "react"; 
import { formatTimeDuration, Week } from "../../utils/dateTimeUtils";
import styles from "./Timer.module.css";

interface IProps { 
	rawTargetDate: string// Пн 21:30 etc.
}

export default function Timer({ rawTargetDate }: IProps) {
	const [difference, setDifference] = useState<number>(0)
	const timerValue = formatTimeDuration(difference)
	
	const targetDayId = Week.getIdByName(rawTargetDate)
	const [targetHour, targetMinute] = [+rawTargetDate.substring(3, 5), +rawTargetDate.substring(6, 8)]

	// calculate diffenence betwen now and taget unix time
	const updateTimer = () => {
		const currentDate = new Date()
		const targetDate = new Date()

		targetDate.setDate(currentDate.getDate() + (targetDayId + 7 - currentDate.getDay()) % 7);
		targetDate.setHours(targetHour)
		targetDate.setMinutes(targetMinute)
		targetDate.setSeconds(0)
		
		const targetUnixDate = Math.round(targetDate.getTime() / 1000)
		const currentUnixDate = Math.round(Date.now() / 1000)
		
		setDifference(targetUnixDate - currentUnixDate)
	}
	useEffect(updateTimer, [])

	useEffect(() => {
		const interval = setInterval(() => {
			setDifference((prevDiff: number) => prevDiff - 1)
		}, 1000)
		
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const handleWindowFocus = () => {
			updateTimer()
		}

		window.addEventListener('focus', handleWindowFocus)
		
		return () => window.removeEventListener('focus', handleWindowFocus)
	}, [])


	return (
		<h1 className={styles.timer}>
			{timerValue}<br/>
		</h1>
	)
}
