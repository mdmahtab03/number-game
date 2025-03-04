import { useState } from 'react'
import Board from './components/Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=' w-full'>
      <Board></Board>
      </div>
      
    </>
  )
}

export default App
