import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const citySlice = createSlice({
  name: 'city',
  initialState: {
    cityList: [],
    paramList: [],
    weatherData: []
  },
  reducers: {
    addCity: (state, action) => {           
      state.cityList = [...state.cityList, action.payload];
    },

    addParams: (state, action) => {      
      state.paramList = action.payload;
    },

    removeCity: (state, action) => {      
      const newCityList = state.cityList.filter(city => city.id !== action.payload)
      state.cityList = newCityList;     
    },
    resetState: (state) => {
      state.cityList = [];
      state.paramList = [];
      state.weatherData = []      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherDataAsync.fulfilled, (state, action) => {
        state.weatherData = action.payload;        
      });
  },
})

const fetchSingleData = async(city) => {
  const weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=precipitation,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,rain_sum&timezone=Asia%2FTokyo`)

  const airQuality = await axios.get(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.latitude}&longitude=${city.longitude}&hourly=pm10,pm2_5,dust`)
  return {city, weather: weather.data, airQuality: airQuality.data}
} 

export const fetchWeatherDataAsync = createAsyncThunk(
  'city/fetchWeatherData',
  async (cities) => {
    try{
    const promiseList = cities.map(city => fetchSingleData(city))
    // The value we return becomes the `fulfilled` action payload
    return await Promise.all(promiseList)
    } catch(e) {console.log(e);
       return []}
  }
);

export const { addCity, addParams, removeCity, resetState } = citySlice.actions;

export default citySlice.reducer;