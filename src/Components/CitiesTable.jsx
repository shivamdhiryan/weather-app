import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const CitiesTable = () => {
    const [cities,setCities] = useState([]);
    const [search,setSearch] = useState("");
    const [seeData,setSeeData] = useState([])


    const searchCity = (e)=>{
        setSearch(e.target.value);
    }

    const apiCitiesData = async ()=>{

      try {
          const res = await  axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?limit=20");

          setCities(res.data.results);
      }
      catch(error){
        console.log(error);
      }
      
    } 


    
    useEffect(()=>{
        apiCitiesData();
    },[])
    
    useEffect(()=>{
      
        const filterData = ()=>{
            const somefilte = cities.filter((item)=>(
                item.name.toLowerCase().includes(search.toLowerCase())
                
            ))
            setSeeData(somefilte);
        }
        filterData();
    },[cities,search]);



    return  (
        <div>
            <div className="flex flex-col w-[80%] mx-auto mt-16">
                <h1 className='text-center text-[20px] mb-4 font-semibold'>Cities Name</h1>
                <input onChange={searchCity} type="text" placeholder='Search city' value={search}  className='p-4 w-[50%] border border-black shadow rounded'/>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            City
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Country
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Timezone
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {seeData.map((item,id)=> (
                                        <tr key={id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                            <Link to={`/weather/${item.name}`}>{item.name}</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                           {item.country}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {item.timezone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CitiesTable
