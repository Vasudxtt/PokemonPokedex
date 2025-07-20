import { useState } from "react"
import {first151Pokemon, getFullPokedexNumber} from"../utils/index"


export default function SideNav(props){
  const {selectedPokemon,setSelectedPokemon,handleCloseMenu,showSideMenu} = props


  const[searchValue,setSearchValue]=useState('')

  const filteredPokemon = first151Pokemon.filter((ele,eleIndex)=>{
// if the full pokedex number includes the current search value, return true and keep the value in the array
// to string is from python we cxan delete it if we want
if((getFullPokedexNumber(eleIndex)).includes(searchValue)){return true}
// if the pokemon name includes the current search value, return true and keep the value in the array
if(ele.toLowerCase().includes(searchValue.toLowerCase())){return true}
// otherwise exclude value from the array
return false
  })

  return(
    <nav className={'' + (showSideMenu ? 'open' : '' )}>
      <div className={"header "  + (showSideMenu ? 'open' : '' )}>
        <button onClick={handleToggleMenu} className="open-nav-button">
           <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="text-gradient">Pokédex</h1>
      </div>
      <input placeholder="Search for Pokémon 0r 001...." value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} />

      {filteredPokemon.map((pokemon,pokemonIndex)=>{
        const truePokedexNumber = first151Pokemon.indexOf(pokemon)
        return(
          <button onClick={()=>{setSelectedPokemon(truePokedexNumber) }} key={pokemonIndex} className={'nav-card ' + (pokemonIndex === selectedPokemon ? 'nav-card-selected' : ''

        )}>
            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        )
      })}
    </nav>
  )
}