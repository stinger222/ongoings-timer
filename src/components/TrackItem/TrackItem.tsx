import { completeLastCheckItem, updateCard } from "../../redux/reducers/cardsReducer";
import { easings, useSpring, animated } from "react-spring";
import { ITrelloCardData } from "../../models/cardsModels";
import { useAppDispatch } from "../../hooks/redux";

import ProgressBar from "../ProgressBar/ProgressBar";
import TrelloIcon from '../../images/trello.svg';
import CheckIcon from '../../images/check.svg';
import Timer from "../Timer/Timer";

import styles from "./TrackItem.module.css";

interface IProps {
	cardData: ITrelloCardData,
	index: number
}

export default function TrackItem({ cardData, index }: IProps) {
	const {
		checkItems,
		checkItemsChecked,
		checklistId,
		cardTitle,
		cardDesc,
		cardUrl,
		cardId
	} = cardData

	const dispatch = useAppDispatch()

	const [title, rawTargetDate] = cardTitle.split(' - ')
	const [playerUrl, imageUrl] = cardDesc.split('\n')

	const spring = useSpring({
		from: { x: -80, opacity: 0 },
		to: { x: 0, opacity: 1 },
		delay: 90 * index + 40,
		config: {
			duration: 300,
			easing: easings.easeOutBack
		}
	})
	
	const handleDebugCardUpdate = () => {
		dispatch(updateCard({
			'cardDayId': cardData.cardDayId,
			'cardId': cardData.cardId,
			'checkItemsChecked': cardData.checkItemsChecked + 1
		}))
	}

	const handleComplete = () => {
		dispatch(completeLastCheckItem(cardData))
	}

	return (
		<animated.div style={spring} className={styles.card}>
			<div className={styles.icon_wrapper}>
				<button className={styles.icon} onClick={handleComplete} title="complete next episode">
					<img src={CheckIcon} />
				</button>
				<button className={styles.icon} onClick={handleDebugCardUpdate} title="handle Debug Card Update (without any requests)">
					<img src={CheckIcon} />
				</button>
				<a className={styles.icon} href={cardUrl} title="card on trllo">
					<img src={TrelloIcon} />
				</a>
			</div>

			<img className={styles.image} src={imageUrl}/>
			<div className={styles.info}>
				<a className={styles.title} href={playerUrl} title="go to player">{title}</a>
				<ProgressBar checkItems={checkItems} checkItemsChecked={checkItemsChecked}/>
				<Timer targetDate={rawTargetDate}/>
			</div>
		</animated.div>
	)
}