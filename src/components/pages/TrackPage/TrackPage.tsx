import { clearDistributedCards, fetchCardsData } from "../../../redux/reducers/cardsReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect } from "react";

import { ReactComponent as GitHubIcon } from "../../../assets/github.svg";
import TrackItem from "../../TrackItem/TrackItem";
import EmptyDay from "../../EmptyDay/EmptyDay";
import Loader from "../../Loader/Loader";

import styles from "./TrackPage.module.css";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

export default function TrackPage() {  
	const dispatch = useAppDispatch()

  const selectedDay = useAppSelector(state => state.headerReducer.selectedDay)
	const selectedDayCardsData = useAppSelector(state => state.cardsReducer.distributedData[selectedDay])
	const isPending = useAppSelector(state => state.cardsReducer.isPending)
  const { isAuthorized, selectedBoard, selectedList } = useAppSelector(state => state.authReducer)
	
	const __DEV__ = process.env.NODE_ENV === "development"
  const entryPointSelected = selectedBoard && selectedList

	const fetchCards = () => {
    dispatch(clearDistributedCards())
		dispatch(fetchCardsData())
	}

	useEffect(() => {
    if (!__DEV__ && isAuthorized && entryPointSelected) {
      fetchCards()
		}
	}, [isAuthorized, selectedList])
  
  if (!entryPointSelected) {
    return <ErrorMessage message="You forgot to select board and/or list in the settings ⚙️ :)"/>
  }

	return (
		<section className={`${styles.track_list} container`}>
			{
				__DEV__ &&
				<button style={{border: "1px solid black", borderRadius: "10px", fontSize: "1.5em", marginBottom: "10px", padding: "3px 7px"}}
				onClick={fetchCards}> Fetch Cards (debug) 
				</button>
			}
			{ // Render cards
				selectedDayCardsData?.length !== 0 && selectedDayCardsData.map((data, index) => (
					<TrackItem cardData={data} index={index} key={data.cardId}/>)
				)
			}

			{ // Render loader
				isPending && <Loader/>
			}

			{ // Render stub if there is no cards 
				selectedDayCardsData?.length === 0 && !isPending && <EmptyDay/> 
			}

			<a className={styles.gh_link} href="https://github.com/stinger222/ongoings-timer" target="_blank" rel="noreferrer">
				<GitHubIcon className={styles.gh_icon}/>
				<span className={styles.gh_text}>GitHub Page</span>
			</a>
		</section>
	)
}
