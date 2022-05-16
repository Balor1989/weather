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

const printWeather = (response, icon) => {
  console.log(
    dedent(`${chalk.bgMagenta("Weather")}
    Погода в городе ${response.name}
    ${icon}  ${response.weather[0].description}
    Температура: ${response.main.temp} (Ощущается как ${
      response.main.feels_like
    } )
    Влажность: ${response.main.humidity}%
    Скорость ветра: ${response.wind.speed}
        `)
  );
};

export { printError, printSuccess, printHelp, printWeather };
