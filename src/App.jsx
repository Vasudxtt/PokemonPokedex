import { useState } from "react"
import { Header } from "./components/Header"
import { PokeCard } from "./components/PokeCard"
import { SideNav } from "./components/SideNav"

function App() {
const [selectedPokemon, setSelectedPokemon] = useState
  return (
    <>
    <Header/>
    <SideNav/>
    <PokeCard/>
    </>
  )
}

export default App
