/**
 * @fileoverview Utils for everything date-related
 */


/**
 * 
 * @param targetDate Unix date 
 * @returns How much days, hours, minutes and seconds fit in diff between `targetDate` andnow 
 */
export const parseDateToCountdown = (targetDate: Date) => {
    const now = new Date()
    // Diff in ms
    const diff = targetDate.getTime() - now.getTime()

    // Handle past dates
    // if (diff <= 0) {
    //   return { days: 0, hours: 0, mins: 0, secs: 0 }
    // }

    const seconds = Math.floor((diff / 1000) % 60)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    return { days, hours, mins: minutes, seconds }
  }