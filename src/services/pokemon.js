import axios from 'axios';

export const getPokemons = async (page = 0, limit = 100) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page * limit}&limit=${limit}`);
    return response.data;
}

export const getPokemonByType = async (type) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    return response.data;
}
export const getPokemonByName = async (name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
}

export const getPokemonTypes = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type`);
    return response.data;
}