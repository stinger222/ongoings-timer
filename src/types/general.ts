export interface CountdownCard {
  id: string
  title: string
  imageUrl: string
  playerUrl: string
  episodes: {
    total: number
    done: number
  }
  nextRelease: {
    time: string
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
  }
}

// export interface CountdownCardProps {
//   id: string,
//   title: string,
//   imageUrl: string,
//   playerUrl: string,
//   episodes: {
//     total: number,
//     done: number
//   },
//   nextReleaseAt: string
// }
