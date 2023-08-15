import { completeLastCheckItem, removeCard, updateCard } from "../../redux/reducers/cardsSlice";
import { easings, useSpring, animated } from "react-spring";
import { useAppDispatch } from "../../hooks/redux";

import { ReactComponent as TrelloIcon } from '../../assets/trello.svg';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { ReactComponent as CrossIcon } from '../../assets/cross.svg';

import ProgressBar from "../ProgressBar/ProgressBar";
import Timer from "../Timer/Timer";

import styles from "./TrackItem.module.css";
import { ITrelloCardData } from "../../types/Trello";

interface IProps {
	cardData: ITrelloCardData,
	index: number
}

export default function TrackItem({ cardData, index }: IProps) {
	const {
		checkItems,
		checkItemsChecked,
		cardTitle: rawCardTitle,
		cardDayId,
		cardDesc,
		cardUrl,
		cardId
	} = cardData
	
	const __DEV__ = process.env.NODE_ENV  === "development"

	const dispatch = useAppDispatch()

  // TODO: use 'extractDayAndTime' utility here
  // (but it first should be finished, and I can't finish it cause app not working anymore :/)
	const delimiterIndex = rawCardTitle.lastIndexOf(' - ')
	const title = rawCardTitle.substring(0, delimiterIndex)
	const rawTargetDate = rawCardTitle.substring(delimiterIndex + 3, rawCardTitle.length) // Пн 21:30 etc.
	
	const [playerUrl, imageUrl] = [...cardDesc.match(/(?<=\()(https\:\/\/.*)(?=(\s\"))|^https\:\/\/.*$/gm) || []]

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
			cardDayId: cardDayId,
			cardId: cardId,
			checkItemsChecked: checkItemsChecked + 1
		}))
	}

	const handleComplete = () => {
		dispatch(completeLastCheckItem(cardData))
	}
	
	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		console.error('Can\'t load thumbnail. Replacing with default image...');
		e.currentTarget.src = require('../../assets/thumbnail-stub.png')
	}

	const handleDelete = () => {
		if (!window.confirm('You sure you want to delete this card?')) return

    const cardToRemove = { cardId, cardDayId }

		dispatch(removeCard(cardToRemove))
	}

	return (
		<animated.div style={spring} className={styles.card}>
			<div className={styles.icon_wrapper}>
				<button className={styles.icon} onClick={handleComplete} title="Complete next episode">
					<CheckIcon/>
				</button>

				{
					__DEV__ &&
					<button className={styles.icon} onClick={handleDebugCardUpdate} title="Handle Debug Card Update (without any requests)">
						<CheckIcon />
					</button>
				}

				<a className={styles.icon} href={cardUrl} title="Card on trllo" target='_blank' rel="noreferrer">
					<TrelloIcon />
				</a>
				
				<button className={styles.icon} onClick={handleDelete}title="Delete card">
					<CrossIcon />
				</button>
			</div>

			<img
				className={styles.image}
				src={imageUrl ?? "x"}
				alt=""
				onError={handleImageError}
			/>
	
			<div className={styles.info}>
				<a
          className={styles.title}
          href={playerUrl}
          title="Go to player"
          target="_blank"
          rel="noreferrer"
        >
          {__DEV__ ? rawCardTitle : title}
        </a>
        
				<ProgressBar checkItems={checkItems} checkItemsChecked={checkItemsChecked}/>
				<Timer rawTargetDate={rawTargetDate}/>
			</div>
		</animated.div>
	)
}
