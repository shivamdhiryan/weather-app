import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WeatherPage from './Components/WeatherPage'
import CitiesTable from './Components/CitiesTable'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CitiesTable/>}/>
        <Route path="/weather/:cityName" element={<WeatherPage/>}/>
      </Routes>
    </div>
  )
}

export default App
