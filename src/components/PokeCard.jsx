import { useEffect, useState } from "react"
import {getFullPokedexNumber, getPokedexNumber} from "../utils/index"
import { TypeCard } from "./TypeCard"

export default function PokeCard(props){
  const {selectedPokemon} = props
  // data here will be the actual pokemon information
  const[data,setData] = useState(null)
  // loading state
  const[loading,setLoading] = useState(false)

  const {name,height,abilities,stats,types,moves,sprites} = data || {}

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
      setLoading(true)
      try{
        const baseUrl = 'https://pokeapi.co/api/v2/'
        const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
        const finalUrl = baseUrl + suffix
        const res = await fetch(finalUrl)
        const pokemonData = await res.json()
        setData(pokemonData)
      cache[selectedPokemon] = pokemonData
      localStorage.setItem('pokedex',JSON.stringify(cache))
      } catch(err){
        console.log(err.message);
      }finally{
        setLoading(false)
      }
      
    }

    fetchPokemonData()

    // 3 if we fetch the api , make sure to save the information to the cache for next time
  },[selectedPokemon])

if(loading || !data){
  return(
    <div>
      <h4>Loading...</h4>
    </div>
  )
}

  return(
    <div className="poke-card">
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h5>{name}</h5>
      </div>
      <div className="type-container">
        {types.map((type,typeIndex)=>{
          return(
            <TypeCard key={typeIndex} type={type}/>
          )
        })}
      </div>
    </div>
  )
}