import {first151Pokemon} from"../utils/index"




export function SideNav(){
  return(
    <nav>
      {first151Pokemon.map((pokemon,pokemonIndex)=>{
        return(
          <button>
            <p>{pokemon}</p>
          </button>
        )
      })}
    </nav>
  )
}