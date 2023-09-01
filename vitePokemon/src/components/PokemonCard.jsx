import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import background from "../assets/bg.webp";
import pokeBallEmpty from "../assets/pokeballEmpty.png";
import pokeBallFull from "../assets/pokeballFull.png";
import "../styles/pokemonCard.css";

export function PokemonCard({ pokemon, state, captured }) {
  const [isShiny, setIsShiny] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [captureInfo, setCaptureInfo] = useState([]);
  const [moveList, setMoveList] = useState(() => {
    return [...pokemon?.moves.map((move) => move.move)];
  });
  const [moveDetailList1, setMoveDetailList1] = useState([]);
  const [moveDetailList2, setMoveDetailList2] = useState([]);

  useMemo(() => {
    const moves = moveList?.splice(0, 2);
    async function moves1Url() {
      return await axios
        .get(moves[0]?.url)
        .then((res) => {
          if (res.status === 200) {
            setMoveDetailList1([res.data]);
          }
        })
        .catch((err) => console.log(err));
    }
    moves && moves1Url();
    async function moves2Url() {
      return await axios
        .get(moves[1]?.url)
        .then((res) => {
          if (res.status === 200) {
            setMoveDetailList2([res.data]);
          }
        })
        .catch((err) => console.log(err));
    }
    moves && moves2Url();
  }, [moveList]);

  useEffect(() => {
    setIsShiny(false);
  }, [state, captureInfo]);

  function handleShiny() {
    return setIsShiny(!isShiny);
  }

  function handleCapture(pokeInfo) {
    if (!isCaptured) {
      localStorage.setItem("capturedInfo", JSON.stringify(pokeInfo));
      const existingPokeList = localStorage.getItem("capturedList") || [];
      console.log(existingPokeList);
      if (existingPokeList.length === 0) {
        const newList = [{ pokeInfo, captured: true }];
        localStorage.setItem("capturedList", JSON.stringify(newList));
      } else if (existingPokeList.length > 0) {
        const newPokeList = JSON.parse(existingPokeList);
        const alteredList = [...newPokeList, { pokeInfo, catpured: true }];
        localStorage.setItem("capturedList", JSON.stringify(alteredList));
      }
    } else if (isCaptured) {
      localStorage.setItem("capturedInfo", JSON.stringify([]));
    }
  }

  return (
    <>
      {state === "loading" ? (
        "loading"
      ) : (
        <div className="cardContainer">
          <div className="titleContainer">
            {pokemon?.name.charAt(0).toUpperCase() +
              pokemon?.name.slice(1).toLowerCase()}
            <div>
              {pokemon?.stats[0].base_stat}

              {pokemon?.stats[0].stat.name}
            </div>
          </div>

          <div className="pokemonImgContainer">
            <div className="pokemonImg">
              <div className="pokemonSprite">
                {isShiny ? (
                  <img src={pokemon?.sprites?.front_shiny} />
                ) : (
                  <img src={pokemon?.sprites?.front_default} />
                )}

                <button className="shinyButton" onClick={() => handleShiny()}>
                  shiny: {""}
                  {isShiny ? "on" : "off"}
                </button>
              </div>
              <div className="pokemonBackgroundImg">
                <img src={background} />
              </div>
            </div>
          </div>

          <div className="pokemonStatsContainer">
            <div className="pokemonNameContainer">
              <div className="pokemonMovesContainer">
                {moveDetailList1?.map((move) => (
                  <div className="moves" key={move.id}>
                    <div>{move.name}</div>
                    PP: {move.pp}
                  </div>
                ))}
                {moveDetailList2?.map((move) => (
                  <div className="moves" key={move.id}>
                    <div>{move.name}</div>
                    PP: {move.pp}
                  </div>
                ))}
              </div>
              <div className="pokedexLink">
                <button className="btn">Pokedex</button>

                <img
                  onClick={() => {
                    setIsCaptured(!isCaptured);
                    handleCapture(pokemon);
                  }}
                  src={captured ? pokeBallFull : pokeBallEmpty}
                  width="40"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
