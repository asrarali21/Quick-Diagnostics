import React, { useEffect, useState } from 'react'
import {  SearchIcon } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'
import banner from '../assets/banner.png'

function Search() {
    const [Searchquery, setSearchquery] = useState("")
  
    const [FilterData, setFilterData] = useState([])
 

      const apiData = useRecoilValue(apiDataState)

    useEffect(() => {
      const  filtereddata = apiData.filter((item )=> {
        if (item.name.toLowerCase().includes(Searchquery.toLowerCase())) {
          return true
        }
      })
      console.log(filtereddata);
      
      setFilterData(filtereddata)
    }, [Searchquery,apiData])
    

  return (
    <>
    <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={Searchquery}
          placeholder= "search for labs , packages"
          onChange={(e)=>setSearchquery(e.target.value)}
          className="pl-10 pr-10 py-3 text-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
          />
    </div>
    
    {Searchquery.length !== 0 ? (
      <div>
       <p>{FilterData.length} {FilterData.length === 1 ? 'result' : 'results'} found 
  </p>
      {FilterData.map((item , i)=>( 
        <div key={i}>
          <p className='cursor-pointer'>{item.name}</p>
        </div>      
      ))}
     </div>
    ) : null}
    <div>
      <img className='w-[80%] mt-8' src={banner} alt="" />
    </div>
          </>
  
  )
}

export default Search