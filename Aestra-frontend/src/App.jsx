import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="website">
      <h1>Techwear</h1>

      <div className='main-feature'>
        <div className='prompt'>prompts and info</div>
        <div className='imageF'>our image</div>
        <div className='used'>item used</div>
      </div>
    </div>
  )
}

export default App
