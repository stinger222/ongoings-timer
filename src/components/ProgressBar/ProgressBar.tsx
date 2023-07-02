import styles from "./ProgressBar.module.css";

interface IprogressBarData {
	result: number[],
	isMoreAfter: boolean
}

const getRange = (watched: number, len: number): IprogressBarData => {
	let start = Math.max(1, watched-6)
	start += Math.min(0, len - (watched+6))
	start = Math.max(1, start)

	let isMoreAfter = watched < (len - 6) && len > 13
	let result = []

	for (let i = 0; i < Math.min(len, 13); i++) {
		result.push(start + i)
	}

	// 1-13 string way shorter than like 10-23, sooo...
	
	if (start > 5) {
		result.splice(0, 2)
	}

	return {
		result,
		isMoreAfter
	}
}

interface IProgressBarProps {
	checkItemsChecked: number,
	checkItems: number
}

export default function ProgressBar({ checkItemsChecked, checkItems }: IProgressBarProps) {
	const range = getRange(checkItemsChecked, checkItems)
	
	return (
		<div className={`${styles.progress_bar} ${range.isMoreAfter ? styles.is_more_after : ""}`}>
			{
				range.result.map((i) => (
          <span key={i}  className={i <= checkItemsChecked ? styles.watched : ""}>
            {i}
          </span>
          )
        )
			}
		</div>
	)
}
