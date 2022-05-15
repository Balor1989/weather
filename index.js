#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getLatAndLon } from "./services/api.service.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { saveKeyValue, tokenDictionary } from "./services/storage.service.js";

async function saveToken(token) {
  if (!token.length) {
    printError("token not found");
    return;
  }
  try {
    await saveKeyValue(tokenDictionary.token, token);
    printSuccess("Saved");
  } catch (error) {
    printError(error.message);
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getLatAndLon("новая каховка");
};

initCLI();
