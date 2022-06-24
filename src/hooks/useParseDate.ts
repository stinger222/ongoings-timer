
// this "hook" takes ammount of seconds as first parameter
// and returns an array with: days, hours, minutes and seconds
// that fits inside given ammount of seconds

export const useParseDate = (difference: number): string => {
    const isNegative = difference < 0
    difference = Math.abs(difference)

    const days = Math.floor(difference / 86400)
    difference %= 86400

    const hours = Math.floor(difference / 3600)
    difference %= 3600

    const minutes = Math.floor(difference / 60)
    difference %= 60

    const seconds = difference

    return [isNegative ? "-" + hours : days + ":" + hours, minutes, seconds]
    .join(':')
    .replace(/^0:/, "00:")
    .replace(/^-0:/,"-00:")
    .replace(":0:", ":00:")
    .replace(":0:", ":00:")
    .replace(/:0$/, ":00")
}