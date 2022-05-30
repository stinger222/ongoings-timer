import ProgressBar from "../ProgressBar/ProgressBar"
import Timer from "../Timer/Timer"
import styles from "./TrackItem.module.css"

let getDick = () => {
	let res = []
	for (let index = 1; index <= 30; index++) {
		res.push(index)	
	}
	return res
}

export default function TrackItem({ src, rawTitle, length, watched }: any) {
	const clearTitle = (_rawTitle: string): string => _rawTitle.split(' - ')[0]
	return (
		<div className={styles.card}>

			<img className={styles.image} src={src}>

			</img>
			<div className={styles.info}>
				<h2>{clearTitle(rawTitle)}</h2>

				<ProgressBar length={length} watched={watched}/>
				{/* {
					getDick().map(i => <ProgressBar watched={i} length={30} />)
				} */}
				<Timer targetDate="1652951004"/>
			</div>
		</div>
	)
}