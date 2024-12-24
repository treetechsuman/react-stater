import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Nav from './components/common/Nav'
import ThemeToggle from './components/common/ThemeToggle'
import './App.css'
import {brand,links} from './appConfig'
function App() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <Nav brand={{ name: "Stater" }} links={links} />
      <main className="p-6 pt-10 text-center">
        <p> this is test</p>
      </main>
    </div>
  )
}

export default App
