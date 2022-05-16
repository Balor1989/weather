#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getLatAndLon, getIcon } from "./services/api.service.js";
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  getKeyValue,
  saveKeyValue,
  tokenDictionary,
} from "./services/storage.service.js";

async function saveToken(token) {
  if (!token.length) {
    printError("token not found");
    return;
  }
  try {
    await saveKeyValue(tokenDictionary.token, token);
    printSuccess("Token saved");
  } catch (error) {
    printError(error.message);
  }
}

async function saveCity(city) {
  if (!city.length) {
    printError("city not found");
    return;
  }
  try {
    await saveKeyValue(tokenDictionary.city, city);
    printSuccess("City saved");
  } catch (error) {
    printError(error.message);
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(tokenDictionary.city));
    const weather = await getLatAndLon(city);

    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {}
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForecast();
};

initCLI();
