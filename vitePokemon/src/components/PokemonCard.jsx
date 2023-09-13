import { useEffect, useMemo, useState } from "react";
import { handleRelease } from "../functions/handleRelease";
import axios from "axios";
import background from "../assets/bg.webp";
import pokeBallEmpty from "../assets/pokeballEmpty.png";
import pokeBallFull from "../assets/pokeballFull.png";
import "../styles/pokemonCard.css";
import oneStar from "../assets/1Star.png";
import twoStar from "../assets/2Star.png";
import threeStar from "../assets/3Star.png";
import ballOpen from "../assets/pokeballOpen.png";

export function PokemonCard({
  pokemon,
  state,
  captured,
  setIsCaptured,
  isBallThrown,
  isShiny,
  pokeKey,
  isReleased,
  setIsReleased,
  starRating,
}) {
  const [captureInfo, setCaptureInfo] = useState([]);
  const [moveList, setMoveList] = useState(() => {
    return [...(pokemon?.moves?.map((move) => move.move) ?? [])];
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
    setIsCaptured(captured);
  }, [state, captureInfo, starRating]);

  return (
    <>
      {pokemon !== null ? (
        <>
          <div className="cardContainer">
            <div className="titleContainer">
              {pokemon
                ? `${pokemon?.name?.charAt(0).toUpperCase()}${pokemon?.name
                    ?.slice(1)
                    .toLowerCase()}`
                : "Loading..."}
              <div className="hpContainer">
                {pokemon?.stats[0].base_stat}

                {pokemon?.stats[0].stat.name}
                <img
                  className="starImg"
                  src={
                    (starRating == 1 && oneStar) ||
                    (starRating == 2 && twoStar) ||
                    (starRating === 3 && threeStar)
                  }
                  width="40"
                  height="40"
                />
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
                <div className="shiny">{isShiny ? "Shiny" : ""}</div>
                <div className="pokedexLink">
                  <button className="pokedexBtn">Pokedex</button>

                  <img
                    className={`${isBallThrown ? "rotatingPokeball" : ""}`}
                    onClick={() => {
                      setIsReleased(!isReleased);
                      handleRelease(pokeKey);
                    }}
                    src={captured ? pokeBallFull : pokeBallEmpty}
                    width="40"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Search for your first Pokemon!</div>
      )}
    </>
  );
}
