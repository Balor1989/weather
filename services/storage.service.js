import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

const tokenDictionary = {
  token: "token",
  city: "city",
};

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

async function getKeyValue(key) {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

async function isExist(path) {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

export { saveKeyValue, getKeyValue, tokenDictionary };
