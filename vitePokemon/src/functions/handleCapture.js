import { getRandomNum } from "../api/getRandomNum";

export function handleRun(pokemon) {
  localStorage.setItem("pokemon", null);
  const newInfo = localStorage.getItem("pokemon");
  const getInfo = JSON.parse(newInfo);
  return (pokemon = getInfo);
}
export function handleCapture(pokemon) {
  //FALSEY INPUT
  if (!pokemon.captured) {
    const rand = getRandomNum();
    const runRand = getRandomNum();

    if (runRand >= 4) {
      if (rand >= 7) {
        //HANDLE SINGLE POKEMON UPDATE
        const pokemon = JSON.parse(localStorage.getItem("pokemon"));
        pokemon.captured = true;
        localStorage.setItem("pokemon", JSON.stringify(pokemon));
        //HANDLE POKE LIST UPDATE
        const existingPokeList = localStorage.getItem("pokeList") || [];
        const newPokeList = JSON.parse(existingPokeList);
        const changeCapture = newPokeList.map((poke) => {
          if (poke.key === pokemon.key) {
            return { ...poke, captured: true };
          } else {
            return { ...poke };
          }
        });

        localStorage.setItem("pokeList", JSON.stringify(changeCapture));
      } else if (rand < 7) {
        console.log("did not capture");

        return;
      }
    } else if (runRand < 4) {
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
