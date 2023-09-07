export function handleRelease(pokeKey) {
  console.log(pokeKey);
  const pokeList = JSON.parse(localStorage.getItem("pokeList"));
  console.log(pokeList);
  const newPokeList = pokeList.filter((key) => key.key !== pokeKey);
  localStorage.setItem("pokeList", JSON.stringify(newPokeList));
  const newInfo = localStorage.getItem("pokeList");
  return newInfo;
}
