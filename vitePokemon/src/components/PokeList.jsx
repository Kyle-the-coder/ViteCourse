import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokemonCard } from "./PokemonCard";
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
export function PokeList({
  isCaptured,
  setIsCaptured,
  isReleased,
  setIsReleased,
}) {
  const { state } = useNavigation();
  const filterRef = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const [isBallThrown, setIsBallThrown] = useState(false);
  const [isPokeballShown, setIsPokeballShown] = useState(false);
  const [pokeList, dispatch] = useReducer(reducer, [], (initialValue) => {
    const list = localStorage.getItem("captureList");
    if (list === null) return initialValue;
    return JSON.parse(list);
  });

  useEffect(() => {}, [pokeList]);

  const handleSelectChange = (event) => {
    filterRef.current = event.target.value;

    if (filterRef.current === "shinys") {
      dispatch({ type: FILTERS.SHINY });
      if (isChecked) {
        dispatch({ type: FILTERS.SHINY });
      }
    }
    if (filterRef.current === "hpHigh") {
      dispatch({ type: FILTERS.HPHIGH });
      if (isChecked) {
        dispatch({ type: FILTERS.SHINY });
      }
    }
    if (filterRef.current === "hpLow") {
      dispatch({ type: FILTERS.HPLOW });
      if (isChecked) {
        dispatch({ type: FILTERS.SHINY });
      }
    }
    if (filterRef.current === "original") {
      dispatch({ type: FILTERS.ORIGINAL });
      if (isChecked) {
        dispatch({ type: FILTERS.SHINY });
      }
    }
    if (filterRef.current === "mostRecent") {
      dispatch({ type: FILTERS.MOST_RECENT });
      if (isChecked) {
        dispatch({ type: FILTERS.SHINY });
      }
    }
  };

  function handleShinyFilter() {
    setIsChecked(!isChecked);
    if (!isChecked) {
      dispatch({ type: FILTERS.SHINY });
    } else if (isChecked) {
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
      if (filterRef.current === undefined) {
        dispatch({ type: FILTERS.ORIGINAL });
      }
    }
  }

  return (
    <>
      <div className="filteredContainer">
        <div className="checkboxContainer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleShinyFilter()}
          />
          <label>Shiny's only</label>
        </div>
        <select onChange={handleSelectChange}>
          <option value="">Select an option</option>
          <option value="mostRecent">Most Recent</option>
          <option value="hpHigh">HP High</option>
          <option value="hpLow">HP Low</option>
          <option value="original">Original</option>
        </select>
      </div>{" "}
      <div className="card-grid">
        {pokeList.map((pokemon) => (
          <div className="gridContainer" key={pokemon.key}>
            <PokemonCard
              pokemon={pokemon.pokeInfo}
              state={state}
              captured={pokemon.captured.capture}
              setIsCaptured={setIsCaptured}
              isCaptured={isCaptured}
              isShiny={pokemon.shiny}
              isBallThrown={isBallThrown}
              pokeKey={pokemon.key}
              isReleased={isReleased}
              setIsReleased={setIsReleased}
              starRating={pokemon.starRating}
              setIsPokeballShown={setIsPokeballShown}
              isPokeballShown={isPokeballShown}
            />
          </div>
        ))}
      </div>
    </>
  );
}
