import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import rainySun from '../assets/rainy.png'
import sunn from '../assets/sunny.png'
import cloudy from '../assets/cloudy.png'
import cloud from '../assets/cloud.jpg'
import rain from '../assets/rain.jpg'
import sun from '../assets/sun.jpg'

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { cityName } = useParams()
  const [weatherIcon, setweatherIcon] = useState();
  const [weatherImg, setWeatherImg] = useState(cloud);
  const [currentdate, setCurrentDate] = useState();

  const weatherApi = async () => {

    try {
      let API_KEY = "e1edb84370559cee50065b3427ec17dc";
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
      setWeatherData(data);
      console.log(data);
    }
    catch (error) {
      console.log("fetching data error", error);
    }
  }

  useEffect(() => {
    weatherApi();
  }, [])
  // console.log(weatherData);

  useEffect(() => {
    if (weatherData && weatherData.weather) {
      const data = weatherData.weather[0].main;
      if (data === "Rain") {
        setweatherIcon(rainySun);
        setWeatherImg(rain);
      } else if (data === "Clouds") {
        setweatherIcon(cloudy);
        setWeatherImg(cloud);
      } else if (data === "Clear") {
        setweatherIcon(sunn)
        setWeatherImg(sun);
      }
    }

    const date = new Date();
    const option = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(date.toLocaleDateString("en-Us", option))


  }, [weatherData])

  return (
    <>
      {weatherData && (
        <div style={{ backgroundImage: `url(${weatherImg})`, backgroundSize: "cover", backgroundPosition: "center" }} className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs border-2">
            <div className="font-bold text-xl">{cityName}</div>
            <div className="text-sm text-gray-500">{currentdate}</div>
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
              <img src={weatherIcon} alt="" />
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl">{(weatherData.main.temp - 273.15).toFixed(1)}°C</div>
              <div className="flex flex-col items-center ml-6">
                <div>{weatherData.weather[0].main}</div>
                <div className="mt-1">
                  <span className="text-sm">
                    <i className="far fa-long-arrow-up" />
                  </span>
                  <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_max - 273.15).toFixed(1)}°C</span>
                </div>
                <div>
                  <span className="text-sm">
                    <i className="far fa-long-arrow-down" />
                  </span>
                  <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_min - 273.15).toFixed(1)}°C</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm text-gray-500">{weatherData.wind.speed}k/h</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">{weatherData.main.humidity}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Pressure</div>
                <div className="text-sm text-gray-500">{weatherData.main.pressure} km</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WeatherPage
