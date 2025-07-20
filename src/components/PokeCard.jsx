import { useEffect, useState } from "react"
import {getFullPokedexNumber, getPokedexNumber} from "../utils/index"
import  TypeCard  from "./TypeCard"
import Modal from "./Modals"

export default function PokeCard(props){
  const {selectedPokemon} = props
  // data here will be the actual pokemon information
  const[data,setData] = useState(null)
  // loading state
  const[loading,setLoading] = useState(false)
  const [skill,setSkill] = useState(null)
  const [loadingSkill,setLoadingSkill] = useState(false)

  const {name,height,abilities,stats,types,moves,sprites} = data || {}

  const imgList = Object.keys(sprites || {}).filter(val =>{
    if(!sprites[val]){return false}
    if(['versions','other'].includes(val)){return false}
    return true
  })

  // this is a function for the skill api as we are not importing it like the one we did for the sele tpokemon through use effect we will be doing this by async fn

  async function fetchMoveData(move,moveUrl) {
    if(loadingSkill || !localStorage || !moveUrl) {return}

    // check cache for move
    let c = {}
    if (localStorage.getItem('pokemon-moves')){
      c = JSON.parse(localStorage.getItem('pokemon-moves'))
    }
if(move in c){
  setSkill(c[move])
  return
}
try {
  setLoadingSkill(true)
  const res = fetch(moveUrl)
  const moveData = res.json
  const description = moveData?.flavour_text_entries.filter()
} catch (err) {
  console.log(err);
} finally{
  setLoadingSkill(false)
}

  }

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
      {/* is skill is true render it out and if it is not true then dont render it out */}
      {skill && (
        <Modal handleCloseModel={()=>{ setSkill(null) }}>


        {/* whatever we write here becomes the children props */}
        <div>
          <h6>Name</h6>
          <h2></h2>
        </div>
        <div>
          <h6>Description</h6>
          <p>asaacadass</p>
        </div>
      </Modal>)}
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h5>{name}</h5>
      </div>
      <div className="type-container">
        {types.map((typeObj,typeIndex)=>{
          return(
            <TypeCard key={typeIndex} type={typeObj?.type?.name}/>
          )
        })}
      </div>
      <img className="default-img" src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large=img`}/>
      <div className="img-container">
        {imgList.map((spriteUrl,spriteIndex)=>{
          const imgUrl = sprites[spriteUrl]
          return(
            <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
          )
        })}
      </div>
      <h3>Stats</h3>
      <div className="stats-card">
        {stats.map((statObj,statIndex)=>{
          const {stat,base_stat} = statObj
          return(
            <div key={statIndex} className="stat-item">
              <p>{stat?.name?.replaceAll('-',' ')}</p>
              <h4>{base_stat}</h4>
            </div>
          )
        })}
      </div>
      <h3>Moves</h3>
      <div className="pokemon-move-grid">
        {moves.map((moveObj,moveIndex)=>{
          // const {move} = moveObj
          return(
            <button className="button-card pokemon-move" key={moveIndex} onClick={()=>{}}><p>{moveObj?.move?.name.replaceAll('-',' ')}</p>
            </button>
          )
        })}

      </div>
    </div>
  )
}