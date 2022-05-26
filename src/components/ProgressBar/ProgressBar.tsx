import styles from "./ProgressBar.module.css";

export default function ProgressBar({ length, watched }: any) {
	return (
		<div className={styles.progress_bar}>
			<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
		</div>
	)
}