import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchCardsData } from "../../../redux/reducers/cardsReducer";
import TrackItem from "../../TrackItem/TrackItem";
import EmptyDay from "../../EmptyDay/EmptyDay";
import styles from "./TrackPage.module.css";

export default function TrackPage() {
	const dispatch = useAppDispatch()
	const selectedDay = useAppSelector(state => state.headerReducer.selectedDay)
	const selectedDayCardsData = useAppSelector(state => state.cardsReducer.distributedData[selectedDay])

	//temp
	const fetchCards = () => {
		dispatch(fetchCardsData())
	}

	return (
		<section className={`${styles.track_list} container`}>
			<button onClick={fetchCards}>adslfksdlfk</button>
			{
				selectedDayCardsData?.length !== 0 && selectedDayCardsData.map((data, index) => (
					<TrackItem cardData={data} index={index} key={data.cardId}/>)
				)
			}
			
			{
				selectedDayCardsData?.length === 0 && <EmptyDay/> 
			}
		</section>
	)
}