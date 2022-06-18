import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchCardsData } from "../../../redux/reducers/cardsReducer";
import TrackItem from "../../TrackItem/TrackItem";
import EmptyDay from "../../EmptyDay/EmptyDay";
import styles from "./TrackPage.module.css";
import Loader from "../../Loader/Loader";

export default function TrackPage() {
	const dispatch = useAppDispatch()
	const selectedDay = useAppSelector(state => state.headerReducer.selectedDay)
	const selectedDayCardsData = useAppSelector(state => state.cardsReducer.distributedData[selectedDay])
	const isPending = useAppSelector(state => state.cardsReducer.isPending)
	

	//temp
	const fetchCards = () => {
		dispatch(fetchCardsData())
	}

	return (
		<section className={`${styles.track_list} container`}>
			<button style={{border: "1px solid black", borderRadius: "10px", fontSize: "1.5em", marginBottom: "10px"}}
			onClick={fetchCards}>adslfksdlfk</button>
			{
				// Render cards
				selectedDayCardsData?.length !== 0 && selectedDayCardsData.map((data, index) => (
					<TrackItem cardData={data} index={index} key={data.cardId}/>)
				)
			}

			{
				// Render loader
				isPending && <Loader/>
			}

			{
				// Render stub if there is no cards 
				selectedDayCardsData?.length === 0 && !isPending && <EmptyDay/> 
			}
		</section>
	)
}