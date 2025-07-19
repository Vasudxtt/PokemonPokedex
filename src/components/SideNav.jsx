import {first151Pokemon, getFullPokedexNumber} from"../utils/index"




export function SideNav(){
  return(
    <nav>
      {first151Pokemon.map((pokemon,pokemonIndex)=>{
        return(
          <button>
            <p>{getFullPokedexNumber(pokemonIndex)}</p>
            <p>{pokemon}</p>
          </button>
        )
      })}
    </nav>
  )
}