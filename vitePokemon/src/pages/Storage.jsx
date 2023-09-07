import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokeList } from "../components/PokeList";
import { PokemonCard } from "../components/PokemonCard";

function Storage() {
  const { state } = useNavigation();
  const [isCaptured, setIsCaptured] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [pokeList, setPokeList] = useState(() => {
    const list = localStorage.getItem("pokeList");
    if (list === null) return [];
    return JSON.parse(list);
  });

  useEffect(() => {
    const pokeInfo = localStorage.getItem("pokeList");
    if (pokeInfo !== null) {
      const pokemon = JSON.parse(pokeInfo);

      setPokeList(pokemon);
    }
  }, [isCaptured, state]);

  return (
    <>
      <div className="container">
        <h1>Storage</h1>
        <PokeList
          pokeList={pokeList}
          isCaptured={isCaptured}
          setIsCaptured={setIsCaptured}
          state={state}
          isShiny={isShiny}
        />
      </div>
    </>
  );
}

export const storageRoute = {
  element: <Storage />,
};
