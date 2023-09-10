import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokeList } from "../components/PokeList";

function Storage() {
  const { state } = useNavigation();
  const [isCaptured, setIsCaptured] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [pokeList, setPokeList] = useState(() => {
    const list = localStorage.getItem("captureList");
    if (list === null) return [];
    return JSON.parse(list);
  });

  useEffect(() => {
    const pokeInfo = localStorage.getItem("captureList");
    if (pokeInfo !== null) {
      const pokemon = JSON.parse(pokeInfo);

      setPokeList(pokemon);
    }
  }, [isCaptured, state, isReleased]);

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
          setIsReleased={setIsReleased}
        />
      </div>
    </>
  );
}

export const storageRoute = {
  element: <Storage />,
};
