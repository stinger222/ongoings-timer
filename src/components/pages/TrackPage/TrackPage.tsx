import TrackItem from "../../TrackItem/TrackItem"
import styles from "./TrackPage.module.css"

export default function TrackPage() {
	return (
		<section className={styles.track_list + " container"}>
			<TrackItem
				src="https://amedia.online/uploads/posts/2022-04/thumbs/1649523658_1.jpg"
				rawTitle="len 12 - Сб 20:00"
				length={24}
				watched={17}
			/>
		</section>
	)
}
