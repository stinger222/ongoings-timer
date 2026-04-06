import { SelectedDayContext } from "@/providers/SelectedDayContext"
import { useContext } from "react"

export const useSelectedDay = () => {
  const context: SelectedDayContext = useContext(SelectedDayContext)!
  if (context === undefined) {
    throw new Error("useSelectedDay can't be used outside of SelectedDayContext.Provier")
  }

  return context
}