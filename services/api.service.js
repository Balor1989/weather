import axios from "axios";
import { getKeyValue, tokenDictionary } from "./storage.service.js";

const getLatAndLon = async (city) => {
  const token = await getKeyValue(tokenDictionary.token);
  if (!token) {
    throw new Error(
      "Api key is not found. Please add key with command -t [API_KEY]"
    );
  }
  const { data } = await axios.get(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: city,
        appid: token,
      },
    }
  );

  const coord = data.reduce(
    (acc, { lat, lon }) => ({ ...acc, ["lat"]: lat, ["lon"]: lon }),
    {}
  );

  getCity(coord, token);
  return data;
};

const getCity = async (coord, token) => {
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat: coord.lat,
        lon: coord.lon,
        appid: token,
        units: "metric",
        lang: "ru",
      },
    }
  );
  console.log(data);
};

export { getLatAndLon };
