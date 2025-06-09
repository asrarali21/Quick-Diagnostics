import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'


import { useRecoilValue } from 'recoil'
import { apiDataState } from '../apiState'


function BreadCrum() {
    const {id} = useParams()
    const navigate = useNavigate();
      const location = useLocation();
    const pathnames = location.pathname.split("/")
  const testList =  useRecoilValue(apiDataState)
  const tests = testList.find(t => String(t.id) === id) || location.state?.test 
  console.log(location);
  
  return (
    <div>
            <nav style={{ marginBottom: '1rem' }}>
             <button onClick={()=>navigate("/")}>Back</button>
                <Link to="/">Home</Link>{tests && <> &gt; <span>{tests.name}</span>  &gt; <span> {pathnames}</span></>}
              </nav>
    </div>
  )
}

export default BreadCrum