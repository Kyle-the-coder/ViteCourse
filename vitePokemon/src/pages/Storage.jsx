import { useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";

function Storage() {
  const { state } = useNavigation();
  const [capturedList, setCapturedList] = useState(() => {
    const list = localStorage.getItem("capturedList");
    if (list === null) return [];
    return JSON.parse(list);
  });

  function deletePokemon(pokeId) {
    const newPokeList = capturedList.filter((id) => id.id !== pokeId);
    localStorage.setItem("pokeList", JSON.stringify(newPokeList));
    const newInfo = localStorage.getItem("capturedList");
    const filterList = JSON.parse(newInfo);
    const filtered = filterList.filter((poke) => poke.captured === false);
    setCapturedList(filtered);
  }

  return (
    <>
      <div className="container">
        <h1>Storage</h1>
        <div className="card-grid">
          {capturedList
            ?.slice()
            .reverse()
            .map((pokemon) => {
              return (
                <div className="gridContainer" key={pokemon.id}>
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon.pokeInfo}
                    captured={pokemon.captured}
                    state={state}
                  />

                  <button
                    className="btn"
                    onClick={() => deletePokemon(pokemon.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export const storageRoute = {
  element: <Storage />,
};
