export class Week {
	public static week = [
		"вс", "пн", "вт", "ср", "чт", "пт", "сб"
	]

	public static getIdByDay = (day: string): number => {
		return this.week.findIndex((dayCondidate: string) => day === dayCondidate)
	}

	public static getIdByName = (name: string): number => {
		return Week.week.findIndex((day: string) => (
			name.toLowerCase().includes(day)
		))
	}

	public static getDayById = (id: number) => {
		return this.week[id]
	}
}