'use client'
import { Suspense, useState } from 'react'

import { searchCards } from '../actions'
import List from './List'


export default function Controls() {
  const [filter, setFilter] = useState('')
  const [cards, setCards] = useState<any[]>([])

  async function handleSearch() {
    const result = await searchCards(filter) // calls server action
    setCards(result)
  }

  return (
    <div>
      <input 
        value={filter} 
        onChange={e => setFilter(e.target.value)} 
        placeholder="Search"
      />
      <button onClick={handleSearch}>Search</button>
      <List />
    </div>
  )
}