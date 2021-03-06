import axios from "axios";
import { printError } from "./log.service.js";
import { getKeyValue, tokenDictionary } from "./storage.service.js";

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "âī¸";
    case "02":
      return "đ¤ī¸";
    case "03":
      return "âī¸";
    case "04":
      return "âī¸";
    case "09":
      return "đ§ī¸";
    case "10":
      return "đĻī¸";
    case "11":
      return "đŠī¸";
    case "13":
      return "âī¸";
    case "50":
      return "đĢī¸";
  }
};

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
  if (!coord.lat || !coord.lon) {
    printError("Wrong city");
    return;
  }

  const findedCity = getCity(coord, token);
  return findedCity;
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
  return data;
};

export { getLatAndLon, getIcon };
