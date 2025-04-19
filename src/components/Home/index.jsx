import React, { useState } from 'react'
import { getPokemons } from '../../services/pokemon';
import { usePokemonFilter } from '../../Hooks/filterHook';
import Filter from './Filter';
import List from './List';

const Home = (Pokemons) => {
  const [selectedPokeMonType, setSelectedPokeMonType] = useState("");
  const [pokeMonName, setPokeMonName] = useState("");
  const [pokeMonList, setPokeMonList] = useState(Pokemons || []);
  const [isLoading, setIsLoading] = useState(false);
  usePokemonFilter(pokeMonName, selectedPokeMonType, setPokeMonList,setIsLoading)

  if (isLoading) {
    return (<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
    </div>)
  }

  return (
    <div className='w-full h-full overflow-x-hidden' >
      <Filter
        selectedPokeMonType={selectedPokeMonType} setSelectedPokeMonType={setSelectedPokeMonType}
        pokeMonName={pokeMonName} setPokeMonName={setPokeMonName}
      />
      <List pokeMonList={pokeMonList} />
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  try {
    const data = await getPokemons(0, 1000);
    return {
      props: {
        Pokemons: data.results
      }
    };
  } catch (error) {
    console.error(error);
    return {
      props: { Pokemons: [] }
     };
  }
};