import { getRandomNum } from "../api/getRandomNum";
import { v4 as uuidv4 } from "uuid";

export function handleRun(pokemon) {
  localStorage.setItem("pokemon", null);
  const newInfo = localStorage.getItem("pokemon");
  const getInfo = JSON.parse(newInfo);
  return (pokemon = getInfo);
}
export function handleCapture(pokemon) {
  const randomUUID = uuidv4();
  //FALSEY INPUT
  if (!pokemon.captured) {
    const rand = getRandomNum();
    const runRand = getRandomNum();

    if (runRand >= 2) {
      if (rand >= 4) {
        //HANDLE SINGLE POKEMON UPDATE
        const pokemon = JSON.parse(localStorage.getItem("pokemon"));
        pokemon.captured = true;
        localStorage.setItem("pokemon", JSON.stringify(pokemon));
        //HANDLE POKE LIST UPDATE
        const existingPokeList = localStorage.getItem("pokeList") || [];

        if (existingPokeList.length === 0) {
          const newPokeList = [
            {
              pokeInfo: pokemon.pokeInfo,
              captured: true,
              key: randomUUID,
              shiny: pokemon.shiny,
            },
          ];
          localStorage.setItem("pokeList", JSON.stringify(newPokeList));
        } else if (existingPokeList.length !== 0) {
          const newPokeList = JSON.parse(existingPokeList);
          newPokeList.push({
            pokeInfo: pokemon.pokeInfo,
            captured: true,
            key: randomUUID,
            shiny: pokemon.shiny,
          });
          localStorage.setItem("pokeList", JSON.stringify(newPokeList));
        }
      } else if (rand < 4) {
        console.log("did not capture");

        return;
      }
    } else if (runRand < 2) {
      return handleRun();
    }

    //TRUTHY INPUT
  } else if (pokemon.captured) {
    //HANDLE SINGLE POKEMON UPDATE
    localStorage.setItem("capturedInfo", JSON.stringify([]));
    const pokemon = JSON.parse(localStorage.getItem("pokemon"));
    pokemon.captured = false;
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
    //HANDLE POKELIST UPDATE
    const existingPokeList = localStorage.getItem("pokeList") || [];
    const newPokeList = JSON.parse(existingPokeList);
    const changeCapture = newPokeList.map((poke) => {
      if (poke.pokeInfo.id === pokeInfo.id) {
        return { ...poke, captured: false };
      } else {
        return { ...poke };
      }
    });
    localStorage.setItem("pokeList", JSON.stringify(changeCapture));
  }
}