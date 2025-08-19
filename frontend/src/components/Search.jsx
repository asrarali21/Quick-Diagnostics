import React, { useEffect, useState } from 'react'
import {  SearchIcon } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'
import banner from '../assets/banner.png'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [Searchquery, setSearchquery] = useState("")
  
    const [FilterData, setFilterData] = useState([])
     const navigate = useNavigate()

      const apiData = useRecoilValue(apiDataState)

    useEffect(() => {
      const  filtereddata = apiData.filter((item )=> {
        if (item.name.toLowerCase().includes(Searchquery.toLowerCase())) {
          return true
        }
      })

      
      setFilterData(filtereddata)
    }, [Searchquery,apiData])
    

  return (
    <>
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-10">
      <div className="bg-white border border-[#E5E5E5] rounded-xl shadow flex items-center px-4 py-2">
        <SearchIcon className="text-gray-400 w-6 h-6 mr-2" />
        <input
          type="text"
          value={Searchquery}
          placeholder="Search for lab test, packages"
          onChange={(e) => setSearchquery(e.target.value)}
          className="w-full bg-transparent outline-none border-none text-lg placeholder-gray-400 py-2"
        />
      </div>
      {Searchquery.length !== 0 ? (
        <div className="bg-white rounded-lg shadow mt-2 p-4">
          <p className="text-gray-600 mb-2">
            {FilterData.length} {FilterData.length === 1 ? 'result' : 'results'} found
          </p>
          {FilterData.map((item, i) => (
            <div key={i}>
              <p
                className="cursor-pointer hover:text-[#7C5CFC] transition-colors"
                onClick={() => navigate(`testinfo/${item.id}`)}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="w-full flex justify-center">
        <img className="w-full max-w-[100%] mt-8 rounded-2xl" src={banner} alt="" />
    </div>
      </div>
    </>
  )
}

export default Search