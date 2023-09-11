import { useEffect, useReducer, useRef, useState } from "react";
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

function reducer(pokeInfo, { type, payload }) {
  switch (type) {
    case FILTERS.SHINY:
      return pokeInfo.map((pokemon) => pokemon.shiny === true);
    case FILTERS.PPHIGH:
      return pokeInfo.map((pokemon) => pokemon);
    case FILTERS.PPLOW:
      return pokeInfo.map((pokemon) => pokemon);
    case FILTERS.HPHIGH:
      return pokeInfo.map((pokemon) => pokemon);
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
  const [pokeList, setPokeList] = useReducer(reducer, [], (initialValue) => {
    const list = localStorage.getItem("captureList");
    console.log(list === null);
    if (list === null) return [];
    console.log(JSON.parse(list));
    return JSON.parse(list);
  });

  useEffect(() => {
    // const pokeInfo = localStorage.getItem("captureList");
    // if (pokeInfo !== null) {
    //   const pokemon = JSON.parse(pokeInfo);
    //   console.log("pokemon", pokemon);
    //   setPokeList(pokemon);
    // }
  }, [isCaptured, state, isReleased]);

  const handleSelectChange = (event) => {
    selectedOptionRef.current = event.target.value;
  };

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
