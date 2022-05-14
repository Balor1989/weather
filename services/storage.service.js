import { homedir } from "os";
import { join, basename, dirname } from "path";

const filePath = join(homedir(), "weather-data.json");

const saveKeyValue = (key, value) => {
  console.log(basename(filePath));
  console.log(dirname(filePath));
};

export { saveKeyValue };
