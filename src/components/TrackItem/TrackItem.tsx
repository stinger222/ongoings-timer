import { ITrelloCardData } from "../../models/cardsModels"
import ProgressBar from "../ProgressBar/ProgressBar"
import Timer from "../Timer/Timer"
import styles from "./TrackItem.module.css"

export default function TrackItem(props: ITrelloCardData) {
	const {
		checkItems,
		checkItemsChecked,
		checklistId,
		cardTitle,
		cardDesc,
		cardUrl,
		cardId
	} = props

	const [title, rawTargetDate] = cardTitle.split(' - ')
	const [playerUrl, imageUrl] = cardDesc.split('\n')

	return (
		<div className={styles.card}>

			<img className={styles.image} src={imageUrl}/>

			<div className={styles.info}>

				<h2>{title}</h2>
				<ProgressBar checkItems={checkItems} checkItemsChecked={checkItemsChecked}/>
				<Timer targetDate={rawTargetDate}/>
				
			</div>
		</div>
	)
}