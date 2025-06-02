import {  SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function Search() {
    const [Searchquery, setSearchquery] = useState("")
    const [Data, setData] = useState([])
    const [FilterData, setFilterData] = useState([])
    useEffect(() => {
     const FetchedData = async () => { 
      try {
            let response = await fetch("http://localhost:3001/tests")
        let data = await response.json()
        console.log(data)
        setData(data)
        
      } catch (error) {
        console.error("Failed to fetch data" , error)
      }
    
     }
     FetchedData()
    }, [])

    useEffect(() => {
      const  filtereddata = Data.filter((item , i)=> {
        if (item.name.toLowerCase().includes(Searchquery.toLowerCase())) {
          return true
        }
      })
      console.log(filtereddata);
      
      setFilterData(filtereddata)
    }, [Searchquery, Data])
    

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

     <div>
      {FilterData.map((item , i)=>(
        <div key={i}>
           
   <img src={item.icon} alt="" />
        </div>      
      ))}
     </div>
          </>
  
  )
}

export default Search