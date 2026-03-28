'use client'

import { useState } from "react"
import { insetMockCards } from "../actions"

export default function CardsListControls() {
  const [state, setState] = useState(0)
  return (
    <div className="space-x-3">
      <span className="font-bold">{ state }</span>
      <button onClick={() => setState(s => s+1)}>+1</button>
      <button onClick={() => setState(s => s-1)}>-1</button>
      <button onClick={insetMockCards}> Insert some mock data</button>
    </div>
  )
}