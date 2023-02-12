
// this "hook" takes ammount of seconds as first parameter
// and returns an array with: days, hours, minutes and seconds
// that fits inside given ammount of seconds

import { formatNumber } from "../utils/hepler"

export const useParseDate = (difference: number): string => {
    const isNegative = difference < 0
    difference = Math.abs(difference)

    const days = formatNumber(Math.floor(difference / 86400))
    difference %= 86400

    const hours = formatNumber(Math.floor(difference / 3600))
    difference %= 3600

    const minutes = formatNumber(Math.floor(difference / 60))
    difference %= 60

    const seconds = formatNumber(difference)

    return [isNegative ? "-" + hours : days + ":" + hours, minutes, seconds].join(':')
}