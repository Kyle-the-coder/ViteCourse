import "../styles/pokemonCard.css";
import background from "../assets/bg.webp";
import { useEffect, useState } from "react";
import axios from "axios";

export function PokemonCard({ pokemon }) {
  const [isShiny, setIsShiny] = useState(false);
  const [moveList, setMoveList] = useState(() => {
    return [...pokemon?.moves.map((move) => move.move)];
  });
  const [moveDetailList, setMoveDetailList] = useState([]);

  function handleShiny() {
    return setIsShiny(!isShiny);
  }
  useEffect(() => {
    function movesUrl() {
      return moveList.map((url) =>
        axios
          .get(url.url)
          .then((res) => {
            if (res.status === 200) {
              console.log("good");
              const results = res.data;
              setMoveDetailList([...moveDetailList, results]);
            }
          })
          .catch((err) => console.log(err))
      );
    }
    movesUrl();
  }, []);

  console.log(moveDetailList.map((move) => move.name));

  return (
    <>
      {" "}
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
            {/* {moveList.map((move, index) => (
              <div className="pokemonMovesContainer" key={index}>
                {move.name}
                Power:{" "}
              </div>
            ))} */}
            {moveDetailList.map((move) => (
              <div>
                {move.name}
                {move.pp}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
