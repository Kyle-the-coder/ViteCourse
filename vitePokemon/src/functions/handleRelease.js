export function handleRelease(pokeId) {
  const newPokeList = pokeList.filter((id) => id.id !== pokeId);
  localStorage.setItem("pokeList", JSON.stringify(newPokeList));
  const newInfo = localStorage.getItem("pokeList");
  return newInfo;
}
