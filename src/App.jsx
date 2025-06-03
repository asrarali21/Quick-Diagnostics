
import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Search from './components/Search';
import { useSetRecoilState } from 'recoil';
import { apiDataState } from './apiState';

function App() {

  const setApiData = useSetRecoilState(apiDataState)

      useEffect(() => {
       const FetchedData = async () => { 
        try {
              let response = await fetch("http://localhost:3001/tests")
          let data = await response.json()
          console.log(data)
          setApiData(data)
          
        } catch (error) {
          console.error("Failed to fetch data" , error)
        }
      
       }
       FetchedData()
      }, [])
  
  return (
    <>
     <Navbar/>
     <Search/>
    </>
  )
}

export default App
