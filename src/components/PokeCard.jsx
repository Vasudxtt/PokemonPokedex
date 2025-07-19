import { useEffect, useState } from "react"

export function PokeCard(props){
  const {selectedPokemon} = props
  // data here will be the actual pokemon information
  const[data,setData] = useState(null)
  // loading state
  const[loading,setLoading] = useState(false)

  useEffect(()=>{
    // if loading,exit logic 
    if (loading || !localStorage){return}
    //check if the selected pokemon information is available in the cache

    // 1.define the cache
    let cache = {}
    if (localStorage.getItem('pokedex')){
      cache = JSON.parse(localStorage.getItem('pokedex'))
    }
    // 2 check if the slected pokemon is in the cache ,otherwise fetch the pokemon from the api
    if(selectedPokemon in cache){
      // read from cache
      setData(cache[selectedPokemon])
      return
    }

    // we pass all the cache stuff to no avail and now need to fecth the data from api

    async function fetchPokemonData() {
      try{

      } catch(err){
        console.log(err.message);
      }finally{

      }
      
    }

    // 3 if we fetch the api , make sure to save the information to the cache for next time
  },[selectedPokemon])
  return(
    <div></div>
  )
}