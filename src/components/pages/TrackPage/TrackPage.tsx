import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchCardsData } from "../../../redux/reducers/cardsReducer";
import { useEffect } from "react";

import TrackItem from "../../TrackItem/TrackItem";
import EmptyDay from "../../EmptyDay/EmptyDay";
import Loader from "../../Loader/Loader";

import styles from "./TrackPage.module.css";


export default function TrackPage() {
	const dispatch = useAppDispatch()

	const selectedDay = useAppSelector(state => state.headerReducer.selectedDay)
	const selectedDayCardsData = useAppSelector(state => state.cardsReducer.distributedData[selectedDay])
	const isPending = useAppSelector(state => state.cardsReducer.isPending)
  const isAuthorized = useAppSelector(state => state.authReducer.isAuthorized)
	
	const IS_DEV = process.env.NODE_ENV === "development"

	const fetchCards = () => {
		dispatch(fetchCardsData())
	}
	
	useEffect(() => {
		if (!IS_DEV && isAuthorized) {
			fetchCards()
		}
	}, [isAuthorized])

	return (
		<section className={`${styles.track_list} container`}>
			{
				IS_DEV &&
				<button style={{border: "1px solid black", borderRadius: "10px", fontSize: "1.5em", marginBottom: "10px", padding: "3px 7px"}}
				onClick={fetchCards}> Fetch Cards (debug) 
				</button>
			}
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