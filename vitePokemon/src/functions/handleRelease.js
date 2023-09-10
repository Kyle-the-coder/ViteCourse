export function handleRelease(pokeKey) {
  //HANDLE POKEINFO
  const pokemon = JSON.parse(localStorage.getItem("pokemon"));
  pokemon.captured = false;
  localStorage.setItem("pokemon", JSON.stringify(pokemon));
  //HANDLE LIST
  const pokeList = JSON.parse(localStorage.getItem("captureList"));
  const newPokeList = pokeList.filter((key) => key.key !== pokeKey);
  localStorage.setItem("captureList", JSON.stringify(newPokeList));
  const newInfo = localStorage.getItem("captureList");
  return newInfo;
}
