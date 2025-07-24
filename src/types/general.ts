export interface CountdownCardProps {
  id: string,
  title: string,
  imageUrl: string,
  playerUrl: string,
  episodes: {
    total: number,
    done: number
  },
  nextReleaseAt: string
}
