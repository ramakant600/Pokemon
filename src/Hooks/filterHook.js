
import { useEffect, useState } from "react";
import { getPokemonByType, getPokemons } from "../services/pokemon";

export const usePokemonFilter = (pokeMonName, pokemonType, setPokeMonList,setIsLoading) => {
   useEffect(() => {
    if (pokemonType) {
        fetchPokemonsByType();
      } else {
        fetchPokemons();
      }
    },[pokemonType,pokeMonName]);

    const fetchPokemonsByType = async () => {
        try {
          if (!pokemonType) {
            return;
          }
          const data = await getPokemonByType(pokemonType);
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
}