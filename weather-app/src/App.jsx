import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import {
  IoMdSunny,
  IoMdCloudy,
  IoMdRainy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdLocate,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const APIkey = "f698eeeb716e8341f092a37cdb3d58a5";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Maroc");
  const [weatherClass, setWeatherClass] = useState("clear-sky");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
      updateBackground(res.data.weather[0].main);
    });
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(e.target.elements.location.value);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`;
      axios.get(url).then((res) => {
        setData(res.data);
        updateBackground(res.data.weather[0].main);
      });
    });
  };

  const updateBackground = (weather) => {
    switch (weather) {
      case "Clear":
        setWeatherClass("clear-sky");
        break;
      case "Clouds":
        setWeatherClass("cloudy");
        break;
      case "Rain":
        setWeatherClass("rainy");
        break;
      case "Snow":
        setWeatherClass("snow");
        break;
      case "Thunderstorm":
        setWeatherClass("thunderstorm");
        break;
      case "Haze":
        setWeatherClass("haze");
        break;
      default:
        setWeatherClass("clear-sky");
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner8 className="text-4xl animate-spin" />
      </div>
    );
  }

  let icon;
  let weather = data.weather[0].main;
  let description = data.weather[0].description;

  switch (weather) {
    case "Clear":
      icon = <IoMdSunny className="text-4xl" />;
      break;
    case "Clouds":
      icon = <IoMdCloudy className="text-4xl" />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-4xl" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-4xl" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-4xl" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm className="text-4xl" />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className="text-4xl" />;
      break;
    default:
      icon = <IoMdSunny className="text-4xl" />;
  }

  const date = new Date(data.dt * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return (
    <div className={`body ${weatherClass}`}>
      <form onSubmit={handleSearch} className="mb-4 flex flex-col md:flex-row  max-w-md mx-auto">
        <input
          type="text"
          name="location"
          placeholder="Enter city"
          className="p-2 rounded-t-md md:rounded-l-md md:rounded-t-none w-full"
        />
        <button
          type="submit"
          className="bg-black-500 text-white p-2 rounded-b-md md:rounded-r-md md:rounded-b-none border-2 border-white"
        >
          <IoMdSearch />
        </button>
      </form>
      <button
        onClick={getCurrentLocation}
        className="bg-500 text-white p-2 rounded-md mb-4 border-2 border-white"
      >
        <IoMdLocate />
      </button>
      <div className="card">
        <div className="top">
          <div>{icon}</div>
          <div>
            <div className="text-4xl font-semibold">
              {data.name}, {data.sys.country}
            </div>
          </div>
          <div className="text-3xl">{time}</div>
          <div className="text-2xl">
            {date.getUTCDate()}/{date.getUTCMonth() + 1}/
            {date.getUTCFullYear()}
          </div>
        </div>
        <div className="my-20">
          <div className="flex justify-center items-center">
            <div className="text-[60px] md:text-[120px] leading-none font-light">
              {parseInt(data.main.temp)}
            </div>
            <div className="text-4xl">
              <TbTemperatureCelsius />
            </div>
          </div>
          <div className="capitalize text-center">{description}</div>
        </div>
        <div className="flex flex-col gap-y-4 max-w-xs mx-auto md:max-w-[378px] md:gap-y-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsEye />
              </div>
              Visibility <span className="ml-2">{data.visibility / 1000} km</span>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsThermometer />
              </div>
              <div className="flex">
                Feels like
                <div className="ml-2">{parseInt(data.main.feels_like)}</div>
                <TbTemperatureCelsius />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsWater />
              </div>
              Humidity <span className="ml-2">{data.main.humidity} %</span>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsWind />
              </div>
              Wind <span className="ml-2">{data.wind.speed} m/s</span>
            </div>
          </div>
          <div className="flex justify-between pb-10">
            <div className="flex items-center gap-x-2">
              <div>Sunrise</div>
              <span className="ml-2">{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <div>Sunset</div>
              <span className="ml-2">{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
