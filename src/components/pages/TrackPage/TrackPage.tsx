import TrackItem from "../../TrackItem/TrackItem"
import styles from "./TrackPage.module.css"

export default function TrackPage() {
	return (
		<section className={styles.track_list + " container"}>
			<TrackItem
				src="https://amedia.online/uploads/posts/2022-04/thumbs/1649523658_1.jpg"
				rawTitle="Spy x Family - Сб 20:00"
				length="12"
				watched="7"
			/>
			<TrackItem
				src="https://amedia.online/uploads/posts/2022-01/thumbs/1641648826_1639565096_1.jpg"
				rawTitle="Перестану Быть Героем - Пн 12:30"
				length="12"
				watched="2"
			/>
			<TrackItem
				src="https://amedia.online/uploads/posts/2022-04/thumbs/1649523658_1.jpg"
				rawTitle="Spy x Family - Сб 20:00"
				length="12"
				watched="7"
			/>
		</section>
	)
}
