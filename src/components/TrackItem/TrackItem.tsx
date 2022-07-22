import { completeLastCheckItem, updateCard } from "../../redux/reducers/cardsReducer";
import { easings, useSpring, animated } from "react-spring";
import { ITrelloCardData } from "../../models/trelloModels";
import { useAppDispatch } from "../../hooks/redux";

import { ReactComponent as TrelloIcon } from '../../assets/trello.svg';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { ReactComponent as ThumbnailStub } from '../../assets/thumbnail-stub.svg';
import ProgressBar from "../ProgressBar/ProgressBar";
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
		cardTitle: rawCardTitle,
		cardDesc,
		cardUrl,
		cardId
	} = cardData
	
	const IS_DEV = process.env.NODE_ENV  === "development"

	const dispatch = useAppDispatch()

	const delimiterIndex = rawCardTitle.lastIndexOf(' - ')
	const title = rawCardTitle.substring(0, delimiterIndex)
	const rawTargetDate = rawCardTitle.substring(delimiterIndex + 3, rawCardTitle.length)

	const [playerUrl, imageUrl] = cardDesc.split('\n')

	const spring = useSpring({
		from: { x: -230, opacity: 0 },
		to: { x: 0, opacity: 1 },
		delay: 90 * index + 40,
		config: {
			duration: 400,
			easing: easings.easeOutBack
		}
	})
	
	const handleDebugCardUpdate = () => {
		dispatch(updateCard({
			cardDayId: cardData.cardDayId,
			cardId: cardData.cardId,
			checkItemsChecked: cardData.checkItemsChecked + 1
		}))
	}

	const handleComplete = () => {
		dispatch(completeLastCheckItem(cardData))
	}
	
	const handleImageError = (e: any) => {
		console.error('Can\'t load thumbnail. Replacing with default image...');
		e.target.src = require('../../assets/thumbnail-stub.png')
	}

	return (
		<animated.div style={spring} className={styles.card}>
			<div className={styles.icon_wrapper}>
				<button className={styles.icon} onClick={handleComplete} title="complete next episode">
					<CheckIcon/>
				</button>

				{
					IS_DEV &&
					<button className={styles.icon} onClick={handleDebugCardUpdate} title="handle Debug Card Update (without any requests)">
						<CheckIcon/>
					</button>
				}

				<a className={styles.icon} href={cardUrl} title="card on trllo">
				<TrelloIcon/>
				</a>
			</div>

			<img
				className={styles.image}
				src={imageUrl ?? "x"}
				onError={handleImageError}
			/>
			

			<div className={styles.info}>
				<a className={styles.title} href={playerUrl} title="go to player">{IS_DEV ? rawCardTitle : title}</a>
				<ProgressBar checkItems={checkItems} checkItemsChecked={checkItemsChecked}/>
				<Timer rawTargetDate={rawTargetDate}/>
			</div>
		</animated.div>
	)
}