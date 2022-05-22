import styles from "./TrackItem.module.css"

//Stub 
let Timer = (p:any) => <div></div>

export default function TrackItem({ src, rawTitle, length, watched }: any) {
	return (
		<div className={styles.card}>

			<img className={styles.image} src={src}>

			</img>
			<div className={styles.info}>
				<h1>{rawTitle}</h1>

				<Timer targetDate="1652951004"/> {/* Better precalculated unix time, or raw str from trllo? hmm, I guees second*/}
			</div>
		</div>
	)
}
