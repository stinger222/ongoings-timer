import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from './Dropdown.module.css';

export default function AddCardForm({ handleSubmit }: any) {
	return (
		<Formik
			initialValues={{
				title: "",
				day: "Пн",
				time: "00:00",
				length: "",
				watched: "",
				player_url: "",
				thumbnail_url: "",
			}}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values)
				resetForm()
			}}
			validate={(values) => {
				const errors: any = {};

				const length = +values.length.trim()
				const watched = +values.watched.trim()

				if (isNaN(length)) {
					errors["length"] = true
				}

				if (isNaN(watched)) {
					errors["watched"] = true
				}

				if (errors) return errors
			}}
		>
			<Form className={styles.body}>
				<div className={styles.dropdown_row}>
					<ErrorMessage name="title" >
						{msg => <span className={styles.error_message}></span>}
					</ErrorMessage>
					<Field
						required
						className={styles.dropdown_input}
						name="title"
						placeholder="Card Title"
					/>
				</div>

				<div className={styles.dropdown_row}>
					<Field as="select" name="day">
						<option value="Пн">Пн</option>
						<option value="Вт">Вт</option>
						<option value="Ср">Ср</option>
						<option value="Чт">Чт</option>
						<option value="Пт">Пт</option>
						<option value="Сб">Сб</option>
						<option value="Вс">Вс</option>
					</Field>
					<Field className={styles.dropdown_input} name="time" type="time" />
				</div>

				<div className={styles.dropdown_row}>
					<ErrorMessage name="length" >
						{msg => <span className={styles.error_message}></span>}
					</ErrorMessage>
					<Field
						className={styles.dropdown_input}
						name="length"
						placeholder="Length"
					/>
					<ErrorMessage name="watched" >
						{msg => <span className={styles.error_message}></span>}
					</ErrorMessage>
					<Field
						className={styles.dropdown_input}
						name="watched"
						placeholder="Watched"
					/>
				</div>

				<div className={styles.dropdown_row}>
					<Field
						className={styles.dropdown_input}
						name="player_url"
						placeholder="Player url"
					/>
				</div>

				<div className={styles.dropdown_row}>
					<Field
						className={styles.dropdown_input}
						name="thumbnail_url"
						placeholder="Thumbnail url"
					/>
				</div>

				<button className={styles.dropdown_button} type="submit">
					Create
				</button>
			</Form>
		</Formik>
	)
}
