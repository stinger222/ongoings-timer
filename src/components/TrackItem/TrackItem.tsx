import ProgressBar from "../ProgressBar/ProgressBar"
import Timer from "../Timer/Timer"
import styles from "./TrackItem.module.css"

export default function TrackItem({ src, rawTitle, length, watched }: any) {
	return (
		<div className={styles.card}>

			<img className={styles.image} src={src}>

			</img>
			<div className={styles.info}>
				<h2>{rawTitle}</h2>

				<ProgressBar length={length} watched={watched}/>
				<Timer targetDate="1652951004"/>
			</div>
		</div>
	)
}
