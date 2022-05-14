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

  console.log(data);
};

export { getLatAndLon };
