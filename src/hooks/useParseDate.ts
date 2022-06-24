
// this hook takes ammount of seconds as first parameter
// and returns an array with: days, hours, minutes and seconds
// that fits inside given ammount of seconds

export const useParseDate = (difference: number): Array<string | number> => {
    const days = Math.floor(difference / 86400)
    difference %= 86400

    const hours = Math.floor(difference / 3600)
    difference %= 3600

    const minutes = Math.floor(difference / 60)
    difference %= 60

    const seconds = difference

    return [days, hours, minutes, seconds].map(i => i == 0 ? "00" : i)
}