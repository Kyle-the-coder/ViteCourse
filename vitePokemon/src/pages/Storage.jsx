import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokeList } from "../components/PokeList";
import "../styles/storage.css";

const FILTERS = {
  MOST_RECENT: "MOST_RECENT",
  SHINY: "SHINY",
  HPHIGH: "HPHIGH",
  HPLOW: "HPLOW",
  ORIGINAL: "ORIGINAL",
};

function reducer(pokeInfo, { type }) {
  const ogInfo = localStorage.getItem("captureList");
  switch (type) {
    case FILTERS.SHINY:
      const shinyFilter = pokeInfo.filter((pokemon) => pokemon.shiny === true);
      return shinyFilter;
    case FILTERS.HPHIGH:
      if (ogInfo !== null) {
        const newPokeInfo = JSON.parse(ogInfo).sort((a, b) => {
          const hpStatA = (a.pokeInfo.stats || []).find(
            (stat) => stat.stat.name === "hp"
          );
          const hpStatB = (b.pokeInfo.stats || []).find(
            (stat) => stat.stat.name === "hp"
          );
          if (hpStatA && hpStatB) {
            return hpStatB.base_stat - hpStatA.base_stat;
          }
          return 0;
        });
        return newPokeInfo;
      }
    case FILTERS.HPLOW:
      if (ogInfo !== null) {
        const newPokeInfo = JSON.parse(ogInfo).sort((a, b) => {
          const hpStatA = (a.pokeInfo.stats || []).find(
            (stat) => stat.stat.name === "hp"
          );
          const hpStatB = (b.pokeInfo.stats || []).find(
            (stat) => stat.stat.name === "hp"
          );
          if (hpStatA && hpStatB) {
            return hpStatA.base_stat - hpStatB.base_stat;
          }
          return 0;
        });
        return newPokeInfo;
      }
    case FILTERS.ORIGINAL:
      if (ogInfo !== null) {
        return JSON.parse(ogInfo);
      }
    case FILTERS.MOST_RECENT:
      if (ogInfo !== null) {
        return JSON.parse(ogInfo)
          .slice()
          .reverse()
          .map((poke) => poke);
      }
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

    if (filterRef.current === "shinys") {
      dispatch({ type: FILTERS.SHINY });
    }
    if (filterRef.current === "hpHigh") {
      dispatch({ type: FILTERS.HPHIGH });
    }
    if (filterRef.current === "hpLow") {
      dispatch({ type: FILTERS.HPLOW });
    }
    if (filterRef.current === "original") {
      dispatch({ type: FILTERS.ORIGINAL });
    }
    if (filterRef.current === "mostRecent") {
      dispatch({ type: FILTERS.MOST_RECENT });
    }
  };

  return (
    <>
      <div className="container">
        <div className="storageTitleContainer">
          <h1>Storage</h1>
          <select onChange={handleSelectChange}>
            <option value="">Select an option</option>
            <option value="mostRecent">Most Recent</option>
            <option value="shinys">Shiny's</option>
            <option value="hpHigh">HP High</option>
            <option value="hpLow">HP Low</option>
            <option value="original">Original</option>
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
