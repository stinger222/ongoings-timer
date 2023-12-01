import { useEffect, useState } from "react"; 
import { extractDataFromCardName } from "../../utils/stringUtils";
import { formatTimeDuration, Week } from "../../utils/dateTimeUtils";
import styles from "./Timer.module.css";

interface IProps {
  /** Full name of the card */ 
	cardName: string
}

export default function Timer({ cardName }: IProps) {
	const [difference, setDifference] = useState<number>(0)
	const timerValue = formatTimeDuration(difference)
	
  const [_, dayAbbr, targetHour, targetMinute] = extractDataFromCardName(cardName)
	const targetDayId = Week.getIdByAbbr(dayAbbr)

	// calculate diffenence betwen current and target unix time
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
