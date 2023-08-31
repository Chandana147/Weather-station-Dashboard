// ... (imports and other code)
import axios from "axios";
import { useEffect, useState } from "react";
const App = () => {
  const [city, setCity] = useState("bangalore" || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [weatherData, setWeatherData] = useState({});
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(url);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 404) {
        setError({
          message: "City not found",
        });
      } else if (error.response.status === 400) {
        setError({
          message: "please enter correct city name",
        });
      }
    }
  };

  useEffect(() => {
    getWeather(city);
  }, []);

  return (
    <div>
      <section className="relative min-h-screen bg-gray-900">
        <div className="container relative px-4 pt-12 mx-auto mb-10 text-center">
          <h2 className="mt-4 mb-4 text-4xl font-semibold text-white lg:mb-6 lg:text-6xl">
            Weather Station Dashboard
          </h2>
          <p className="max-w-3xl mx-auto mb-6 text-xl text-white opacity-50 lg:mb-12">
            A mini weather station dashboard which present
          </p>
          {/* Input */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search City"
            className="relative z-10 inline-block w-full px-3 py-2 mb-2 mr-4 font-medium leading-normal text-green-400 bg-transparent border-2 rounded-lg md:w-auto "
          ></input>
          {/* Button */}
          <button
            type="button"
            className="inline-flex items-center px-3 py-3 pr-3 text-sm font-medium leading-4 text-center text-white bg-indigo-600 border border-transparent rounded-md shadow-sm 28 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              getWeather(city);
            }}
          >
            Search
          </button>
        </div>
        {loading ? (
          <h1 className="text-4xl text-center text-gray-400">
            Loading please wait...
          </h1>
        ) : error ? (
          <h1 className="text-2xl text-center text-red-400">
            {error?.message}
          </h1>
        ) : (
          weatherData &&
          weatherData.weather && (
            <div className="px-4 mx-auto max-w-8xl">
              <div className="flex flex-wrap justify-center -mx-4">
                <div className="w-full px-4 md:w-1/3">
                  <div className="p-8 border border-blue-800 rounded-lg">
                    <div className="flex items-center justify-start">
                      <span className="flex items-center justify-center w-16 h-16 border-2 rounded-full">
                        {/* weather logo */}
                        <img
                          className="w-56"
                          src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
                          alt="/"
                        />
                      </span>
                      <h1 className="pl-5 text-gray-300">
                        {weatherData.weather[0]?.main}
                      </h1>
                    </div>
                    <h1 className="mb-10 text-4xl text-center text-gray-300">
                      {Math.ceil(Number(weatherData.main?.temp - 273))}
                      <span className="text-4xl font-semibold text-yellow-500">
                        {" "}
                        °C
                      </span>
                    </h1>
                    <h3 className="mb-6 text-xl font-semibold text-white">
                      {weatherData.name}, {weatherData.sys?.country}
                    </h3>
                    <p className="mb-8 text-gray-300">
                      The weather condition in{" "}
                      <span className="font-semibold text-yellow-300">
                        {weatherData.name}
                      </span>
                      ,{" "}
                      <span className="font-semibold text-yellow-300 ">
                        {weatherData.sys?.country}
                      </span>{" "}
                      is described as:{" "}
                      <span className="font-semibold text-yellow-300">
                        {weatherData.weather[0]?.description}{" "}
                      </span>
                      with a temperature of{" "}
                      <span className="font-semibold text-yellow-300 ">
                        {Math.ceil(Number(weatherData.main?.temp - 273))}
                      </span>{" "}
                      °C and a humidity of{" "}
                      <span className="font-semibold text-yellow-300">
                        {weatherData.main?.humidity}
                      </span>
                      % The wind speed is{" "}
                      <span className="font-semibold text-yellow-500 ">
                        {weatherData.wind?.speed}
                        meters per second.
                      </span>
                    </p>
                    <a
                      className="flex items-center justify-center w-20 h-20 ml-auto text-white rounded-full hover:bg-blue-700"
                      href="#"
                    >
                      <span className="flex items-center justify-center w-16 h-16 border-2 rounded-full">
                        {/* weather logo */}
                        <img
                          className="w-56"
                          src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png`}
                          alt="/"
                        />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default App;
