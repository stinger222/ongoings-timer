import { animated, useSpring } from "react-spring"
import styles from './EmptyDay.module.css'
import img from "../../images/204_1.png"

export default function EmptyDay() {

	const spring = useSpring({
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		},
		delay: 50,
		config: {
			duration: 150
		}
	})

	return (
		<animated.div style={spring}>
			<h1 className={styles.message}>Nothing Here Yet</h1>
			<img  className={styles.img_204} src={img}/>
		</animated.div>
	)
}