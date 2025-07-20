import { useState } from "react"
import {first151Pokemon, getFullPokedexNumber} from"../utils/index"



export default function SideNav(props){
  const {selectedPokemon,setSelectedPokemon} = props

  const[searchValue,setSearchValue]=useState('')

  return(
    <nav>
      <div className={"header"}>
        <h1 className="text-gradient">Pokédex</h1>
      </div>
      <input value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} />
      {first151Pokemon.map((pokemon,pokemonIndex)=>{
        return(
          <button onClick={()=>{setSelectedPokemon(pokemonIndex) }} key={pokemonIndex} className={'nav-card ' + (pokemonIndex === selectedPokemon ? 'nav-card-selected' : ''

        )}>
            <p>{getFullPokedexNumber(pokemonIndex)}</p>
            <p>{pokemon}</p>
          </button>
        )
      })}
    </nav>
  )
}