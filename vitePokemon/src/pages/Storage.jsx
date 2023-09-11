import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokeList } from "../components/PokeList";
import "../styles/storage.css";

const FILTERS = {
  SHINY: "SHINY",
  PPHIGH: "PPHIGH",
  PPLOW: "PPLOW",
  HPHIGH: "HPHIGH",
  HPLOW: "HPLOW",
};

function reducer(pokeInfo, { type }) {
  switch (type) {
    case FILTERS.SHINY:
      return pokeInfo.filter((pokemon) => pokemon.shiny === true);
    case FILTERS.PPHIGH:
      return pokeInfo.map((pokemon) => pokemon);
    case FILTERS.PPLOW:
      return pokeInfo.map((pokemon) => pokemon);
    case FILTERS.HPHIGH:
      console.log("poke", pokeInfo);
      const newPokeInfo = pokeInfo.map((pokemon) => pokemon.pokeInfo);
      // Filter for the "hp" stat and sort by base_stat
      newPokeInfo.sort((a, b) => {
        const hpStatA = a.stats.find((stat) => stat.stat.name === "hp");
        const hpStatB = b.stats.find((stat) => stat.stat.name === "hp");
        if (hpStatA && hpStatB) {
          return hpStatB.base_stat - hpStatA.base_stat;
        }
        // Handle cases where "hp" stat is missing in some pokemons
        return 0;
      });

      console.log(newPokeInfo);
      return pokeInfo.map((pokemon) => {
        return { ...pokemon, pokeInfo: newPokeInfo };
      });
    case FILTERS.HPLOW:
      return pokeInfo.map((pokemon) => pokemon);
  }
}

function Storage() {
  const { state } = useNavigation();
  const filterRef = useRef();
  const [isCaptured, setIsCaptured] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [pokeList, dispatch] = useReducer(reducer, [], (initialValue) => {
    const list = localStorage.getItem("captureList");

    if (list === null) return initialValue;

    return JSON.parse(list);
  });

  const handleSelectChange = (event) => {
    filterRef.current = event.target.value;

    if (filterRef.current === "option1") {
      dispatch({ type: FILTERS.SHINY });
    }
    if (filterRef.current === "option2") {
      dispatch({ type: FILTERS.HPHIGH });
    }
  };
  // console.log(
  //   pokeList.map((pokemon) =>
  //     JSON.parse(pokemon.pokeInfo).stats.map((stat) => stat.base_stat)
  //   )
  // );

  return (
    <>
      <div className="container">
        <div className="storageTitleContainer">
          <h1>Storage</h1>
          <select onChange={handleSelectChange}>
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <PokeList
          pokeList={pokeList}
          isCaptured={isCaptured}
          setIsCaptured={setIsCaptured}
          state={state}
          isShiny={isShiny}
          isReleased={isReleased}
          setIsReleased={setIsReleased}
        />
      </div>
    </>
  );
}

export const storageRoute = {
  element: <Storage />,
};
