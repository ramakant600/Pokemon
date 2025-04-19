import React, { useEffect, useState } from 'react'
import { getPokemonByType, getPokemons } from '../../services/pokemon';
import Filter from './Filter';
import List from './List';

const Home = () => {
  const [selectedPokeMonType, setSelectedPokeMonType] = useState("");
  const [pokeMonName, setPokeMonName] = useState("");
  const [pokeMonList, setPokeMonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemons = async () => {
    try {
      setIsLoading(true);
      const data = await getPokemons(0, 100);
      console.log("Pokemons: ", data, pokeMonName);

      if (pokeMonName) {
        const filteredData = data.results.filter((pokemon) => {
          return pokemon.name.includes(pokeMonName);
        });
        console.log("Filtered Pokemons: ", filteredData);
        setPokeMonList(filteredData);
        return
      }
      setPokeMonList(data.results);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchPokemonsByType = async () => {
    try {
      if (!selectedPokeMonType) {
        return;
      }
      const data = await getPokemonByType(selectedPokeMonType);
      if (pokeMonName) {
        let filteredData = data.pokemon.filter((pokemon) => pokemon.pokemon.name.includes(pokeMonName));
        filteredData = filteredData.map((pokemon) => pokemon.pokemon);
        setPokeMonList(filteredData)
      } else {
        const filteredData = data.pokemon.map((pokemon) => {
          return pokemon.pokemon
        });
        setPokeMonList(filteredData)
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [])

  useEffect(() => {
    if (selectedPokeMonType) {
      fetchPokemonsByType();
    } else {
      fetchPokemons();
    }
  }, [selectedPokeMonType])

  useEffect(() => {
    if (selectedPokeMonType) {
      fetchPokemonsByType();
    } else {
      fetchPokemons();
    }
  }, [pokeMonName])

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
