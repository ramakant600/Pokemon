import React, { useEffect, useRef, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { getPokemonTypes } from '../../services/pokemon';

const Filter = ({ selectedPokeMonType = '', setSelectedPokeMonType,pokeMonName, setPokeMonName }) => {
    const [pokeMonTypes, setPokeMonTypes] = useState([]);
    const searchInputRef = useRef(null);
    useEffect(() => {
        const fetchPokemonTypes = async () => {
            const data = await getPokemonTypes(0, 10);
            setPokeMonTypes(data.results);
        }
        fetchPokemonTypes();
    }, [])

    const handleSearchChange = () => {
        const searchValue = searchInputRef.current.value;
        console.log("Search Value: ", searchValue);
        setPokeMonName(searchValue);
    }

    return (
        <div className='w-full flex flex-col gap-4 p-4 md:p-8'>
            <div className=" w-full md:max-w-[40%] relative inline-block text-left">
                <Menu as="div" className="w-full relative inline-block text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                            {selectedPokeMonType ? selectedPokeMonType : "Select Option"}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="w-full max-h-56 overflow-y-auto absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <div className="py-1">
                         <MenuItem onClick={() => setSelectedPokeMonType('')}>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                       Select Option
                                    </a>
                        </MenuItem>
                            {pokeMonTypes.map((type) => (
                                <MenuItem key={type.name} onClick={() => setSelectedPokeMonType(type.name)}>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        {type.name}
                                    </a>
                                </MenuItem>))
                            }

                            <form action="#" method="POST">
                                <MenuItem>
                                    <button
                                        type="submit"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        Sign out
                                    </button>
                                </MenuItem>
                            </form>
                        </div>
                    </MenuItems>
                </Menu>
            </div>
            <div>
            <div className="mt-2 w-full md:w-1/2">
                <div className="flex items-center rounded-lg bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300  overflow-hidden">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        ref={searchInputRef}
                        id="price"
                        name="price"
                        type="text"
                        placeholder="Search..."
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                    <div className='md:text-base text-sm bg-indigo-600 font-medium text-white !h-full p-[10px] !md:p-[10px] overflow-hidden' onClick={handleSearchChange}>
                      Search
                    </div>
                </div>
            </div>

            </div>
        </div>
    )
}

export default Filter
