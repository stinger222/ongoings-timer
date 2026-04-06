import { getInitialCards } from "@/features/cards-list/actions/getInitialCards"
import CardsPanel from "@/features/cards-list/components/CardsPanel"

export default async function CardsListPage() {
const initialCards = await getInitialCards() // No filters, no sotring, just basic list of cards (for SSR)
  
  return (
    <div className="w-260 mx-auto">
      <CardsPanel initialCards={initialCards} />
    </div>
  )
  
}