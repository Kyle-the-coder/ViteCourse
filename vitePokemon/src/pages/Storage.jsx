import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";

function Storage() {
  const { state } = useNavigation();
  const [isCaptured, setIsCaptured] = useState(false);
  const [capturedList, setCapturedList] = useState(() => {
    const list = localStorage.getItem("pokeList");
    if (list === null) return [];
    const filter = JSON.parse(list);
    const filteredList = filter.filter((poke) => poke.captured !== false);
    return filteredList;
  });

  useEffect(() => {
    const pokeInfo = localStorage.getItem("pokeList");
    if (pokeInfo !== null) {
      const pokemon = JSON.parse(pokeInfo);
      const filteredList = pokemon.filter((poke) => poke.captured !== false);
      setCapturedList(filteredList);
    }
  }, [isCaptured]);

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
                <div className="gridContainer" key={pokemon.pokeInfoSearch.id}>
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon.pokeInfoSearch}
                    captured={pokemon.captured}
                    state={state}
                    setIsCaptured={setIsCaptured}
                    isCaptured={isCaptured}
                  />
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
