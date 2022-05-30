import styles from "./ProgressBar.module.css";

interface IprogressBarData {
	result: number[],
	isMoreAfter: boolean
}

const getRange = (watched: number, len: number): IprogressBarData => {
	let start = Math.max(1, watched-6)
	start += Math.min(0, len - (watched+6))
	start = Math.max(1, start)
	

	let isMoreAfter = watched < (len - 6)

	let result = []
	for (let i = 0; i < Math.min(len, 13); i++) {
		result.push(start + i)
	}

	return {
		result,
		isMoreAfter
	}
}

export default function ProgressBar({ watched, length }: any) {
	const range = getRange(watched, length)
	
	return (
		<div className={`${styles.progress_bar} ${range.isMoreAfter ? styles.is_more_after: ""}`}>
			{
				range.result.map((i) => <span 
						key={i}
						className={i <= watched ? styles.watched : ""}
						>{i}
					</span>)
			}
		</div>
	)
}
