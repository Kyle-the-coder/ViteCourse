import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import background from "../assets/bg.webp";
import pokeBallEmpty from "../assets/pokeballEmpty.png";
import pokeBallFull from "../assets/pokeballFull.png";
import waterB from "../assets/waterB.png";
import "../styles/pokemonCard.css";

export function PokemonCard({ pokemon, state }) {
  const [isShiny, setIsShiny] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [moveList, setMoveList] = useState(() => {
    return [...pokemon?.moves.map((move) => move.move)];
  });
  const [moveDetailList1, setMoveDetailList1] = useState([]);
  const [moveDetailList2, setMoveDetailList2] = useState([]);

  function handleShiny() {
    return setIsShiny(!isShiny);
  }
  useEffect(() => {
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
    moves1Url();
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
    moves2Url();
    setIsShiny(false);
  }, [moveList, state]);

  function handleCapture() {
    return setIsCaptured(!isCaptured);
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
              {pokemon.stats[0].base_stat}

              {pokemon.stats[0].stat.name}
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
                {moveDetailList1.map((move) => (
                  <div className="moves" key={move.id}>
                    <div>{move.name}</div>
                    PP: {move.pp}
                  </div>
                ))}
                {moveDetailList2.map((move) => (
                  <div className="moves" key={move.id}>
                    <div>{move.name}</div>
                    PP: {move.pp}
                  </div>
                ))}
              </div>
              <div className="pokedexLink">
                <button className="btn">Pokedex</button>
                <img
                  onClick={() => handleCapture()}
                  src={isCaptured ? pokeBallFull : pokeBallEmpty}
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
