import React, { useEffect, useState } from 'react'
import {  SearchIcon } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'
import banner from '../assets/banner.png'
import { useNavigate } from 'react-router-dom'
import { TestdataApiState } from '../store/test.state'

function Search() {
    const [Searchquery, setSearchquery] = useState("")
  
    const [FilterData, setFilterData] = useState([])
     const navigate = useNavigate()

      const apiData = useRecoilValue(TestdataApiState)
      console.log(apiData);
      

    useEffect(() => {
      const  filtereddata = apiData.filter((item )=> {
        if (item.testName.toLowerCase().includes(Searchquery.toLowerCase())) {
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
            <div 
              key={i}
              className="flex items-center gap-3 py-3 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => navigate(`/testinfo/${item?._id}`)}
            >
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt="" className="w-8 h-8 object-contain" />
              </div>
              <p className="text-gray-700 font-medium hover:text-[#7C5CFC] transition-colors">
                {item.testName}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      </div>
    </>
  )
}

export default Search