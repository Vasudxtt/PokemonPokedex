import { useState } from "react"
import  Header from "./components/Header"
import  PokeCard  from "./components/PokeCard"
import  SideNav  from "./components/SideNav"

function App() {
const [selectedPokemon, setSelectedPokemon] = useState(0)
const[showSideMenu,setShowSideMenu] = useState(false)

function handleToogleMenu() {
  setShowSideMenu(!showSideMenu)
}
function
  return (
    <>
    <Header handleToggleMenu={handleToogleMenu} />
    <SideNav selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} handleToggleMenu={handleToogleMenu} showSideMenu={showSideMenu}/>
    <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App
