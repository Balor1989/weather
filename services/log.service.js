import chalk from "chalk";
import dedent from "dedent";

const printError = (error) => {
  console.log(`${chalk.bgRed("Error:")} ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen("Success:")} ${message}`);
};

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgMagenta("Help")}
         Без параметров - вывод погоды
         -s [CITY] - установка города
         -р - вывод помощи
         -t [API_KEY] - сохранение токена
        `)
  );
};

export { printError, printSuccess, printHelp };
