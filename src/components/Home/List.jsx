import React from 'react'

const List = ({ pokeMonList = [] }) => {

    return (
        <>
        {pokeMonList.length 
        ? (<div className='w-full h-full flex flex-row flex-wrap justify-start gap-4 md:gap-6 p-4 md:p-8 overflow-x-hidden'>
            {pokeMonList.map((pokemon) => {
                const id = pokemon?.url.split('/')[pokemon.url.split('/').length - 2];
                return <div key={pokemon.name} className='w-full md:w-[250px] h-[260px] bg-gray-200 flex flex-col items-center justify-center md:justify-between rounded-lg shadow-md py-4 hover:shadow-2xl '>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={pokemon.name} className=' h-full object-cover rounded-lg' />
                    <h2 className='text-start text-lg font-semibold text-black '>{pokemon.name}</h2>
                    <a className='text-sm md:text-base text-blue-900' href={`/${pokemon.name}`}>See Details</a>
                </div>
            })
            }
        </div>)
        : (<div className='w-full h-full flex items-center justify-center'>
            <h2 className='text-lg font-semibold text-black'>No Pokemons Found</h2></div>)}
        </>
    )
}

export default List
