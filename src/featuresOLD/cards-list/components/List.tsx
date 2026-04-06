export default function List() {
  console.log('LIIIIIIIISSSSSSSSTTTTTTTTTT!')
  return <div>123</div>
  return (
    <ul>
      {cards.map((i, idx) => <div key={`card_${idx}`}>card {idx}</div>)}
    </ul>
  )
}

// // Kinda server action 

// export default async function List({search}: {search: string | null}) {
//   async function getCards(search: string | null) {
//   await new Promise(r => setTimeout(r, 1000))
//   return [1, 2, 3]
// }


//   const cards = await getCards(search)
  
//   return (
//     <div>
//       {cards.map((i, idx) => <div key={`card_${idx}`}>card {idx}</div>)}
//     </div>
//   )
// }