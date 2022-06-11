import { easings, useSpring, animated } from "react-spring";
import { ITrelloCardData } from "../../models/cardsModels";
import ProgressBar from "../ProgressBar/ProgressBar";
import Timer from "../Timer/Timer";
import styles from "./TrackItem.module.css";


interface iProps {
	cardData: ITrelloCardData,
	index: number
}

export default function TrackItem({ cardData, index }: iProps) {
	const {
		checkItems,
		checkItemsChecked,
		checklistId,
		cardTitle,
		cardDesc,
		cardUrl,
		cardId
	} = cardData

	const [title, rawTargetDate] = cardTitle.split(' - ')
	const [playerUrl, imageUrl] = cardDesc.split('\n')

	const spring = useSpring({
		from: {x: -80, opacity: 0},
		to: {x: 0, opacity: 1},
		delay: 90 * index + 40,
		config: {
			duration: 300,
			easing: easings.easeOutBack
		}
	})

	return (
		<animated.div style={spring} className={styles.card}>
			<img className={styles.image} src={imageUrl}/>
			<div className={styles.info}>
				<h2>{title}</h2>
				<ProgressBar checkItems={checkItems} checkItemsChecked={checkItemsChecked}/>
				<Timer targetDate={rawTargetDate}/>
			</div>
		</animated.div>
	)
}