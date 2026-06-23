import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import User from './User'
import UsedPanel from './UsedPanel'
function App() {
  const [count, setCount] = useState(0)
  const templates = [
  {
    id: 1,
    name: "Summer Streetwear",
    image: "/template1.jpg",
    price: 2499
  },
  {
    id: 2,
    name: "Date Night Outfit",
    image: "/template2.jpg",
    price: 3299
  }
];

const usedProducts = [
  {
    id: 11,
    name: "Black Oversized Tee",
    image: "/shirt.jpg",
    price: 1299
  },
  {
    id: 12,
    name: "Baggy Cargo Pants",
    image: "/cargo.jpg",
    price: 1899
  }
];

  return (
     <div className="website">
      <h1 style={{fontFamily:'Playfair Display',fontSize:30, marginTop:0}}>Aestra</h1>

      <div className='main-feature'>
        <div className='prompt'><User/></div>
        <div className='imageF'>our image</div>
        <div className='used'>
          <UsedPanel
              templates={templates} usedProducts={usedProducts}
            />
        </div>
      </div>
    </div>
  )
}

export default App
