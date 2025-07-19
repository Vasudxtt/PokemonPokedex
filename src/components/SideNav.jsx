import {first151Pokemon, getFullPokedexNumber} from"../utils/index"




export function SideNav(){
  return(
    <nav>
      <div className={"header"}>
        <h1>Pokédex</h1>
      </div>
      {first151Pokemon.map((pokemon,pokemonIndex)=>{
        return(
          <button className={'nav-card '}>
            <p>{getFullPokedexNumber(pokemonIndex)}</p>
            <p>{pokemon}</p>
          </button>
        )
      })}
    </nav>
  )
}