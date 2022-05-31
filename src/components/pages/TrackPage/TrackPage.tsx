import { useAppSelector } from "../../../hooks/redux"
import TrackItem from "../../TrackItem/TrackItem"
import styles from "./TrackPage.module.css"

export default function TrackPage() {
	const selectedDay = useAppSelector(state => state.headerReducer.selectedDay)
	const selectedDayCardsData = useAppSelector(state => state.cardsReducer.distributedData[selectedDay])

	return (
		<section className={`${styles.track_list} container`}>
			{selectedDayCardsData && 
				<TrackItem {...selectedDayCardsData}/>
			}
		</section>
	)
}