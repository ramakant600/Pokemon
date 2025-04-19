'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { getPokemonByName } from '@/services/pokemon';
import { ChevronRightIcon } from '@heroicons/react/20/solid'


const PokemonDetail = () => {
    const [detail, setDetail] = useState(null);
    const param = useParams();
    const { pokemon } = param;

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const data = await getPokemonByName(pokemon);
            console.log("Pokemon Details: ", data);
            setDetail(data);
        }
        fetchPokemonDetails();
    }, [])

    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-4 p-4 md:p-8'>
            <div className='w-full h-auto flex justify-start items-center gap-4 text-black'>
                <a className='text-base font-semibold' href='/'>Home</a>
                <ChevronRightIcon className='w-4 h-4 text-black' />
                <p>{pokemon}</p>
            </div>
            {detail && (
                <div className='w-full md:w-1/3 h-auto rounded-lg md:rounded-2xl  '>
                    <div className=' p-4 md:p-6 bg-[aqua] rounded-t-lg'>
                        <img src={detail?.sprites?.other?.dream_world?.front_default} alt={detail.name} className='w-full h-auto rounded-lg md:rounded-2xl' />
                    </div>
                    <div className='bg-amber-600 flex flex-col gap-1 md:gap-2 p-4 md:p-6 text-black rounded-b-lg'>
                        <div>
                            <span className='font-semibold text-sm md:text-base'>Name :</span><span>{detail?.name}</span>
                        </div>
                        <div>
                            <span className='font-semibold text-sm md:text-base'>Type :</span>
                            <span>{detail?.types.map((type) => {
                                return <span key={type.type.name} className='text-sm md:text-base'> {type.type.name}, </span>
                            })}</span>
                        </div>
                        <div>
                            <span className='font-semibold text-sm md:text-base'>Stats :</span>
                            <span>{detail?.stats.map((stat) => {
                                return <span key={stat.stat.name} className='text-sm md:text-base'> {stat.stat.name}, </span>
                            })}</span>
                        </div>
                        <div>
                            <span className='font-semibold text-sm md:text-base'>Abilities :</span>
                            <span>{detail?.abilities.map((ability) => {
                                return <span key={ability.ability.name} className='text-sm md:text-base'> {ability.ability.name}, </span>
                            })}</span>
                        </div>
                        <div>
                            <span className='font-semibold text-sm md:text-base'>Some Moves :</span>
                            <span>{detail?.moves.slice(0,10).map((move) => {
                                return <span key={move.move.name} className='text-sm md:text-base'> {move.move.name}, </span>
                            })}</span>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default PokemonDetail
