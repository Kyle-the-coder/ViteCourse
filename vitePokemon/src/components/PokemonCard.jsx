import "../styles/pokemonCard.css";
import background from "../assets/bg.webp";
import { useEffect, useState } from "react";
import axios from "axios";

export function PokemonCard({ pokemon }) {
  const [isShiny, setIsShiny] = useState(false);
  const [moveList, setMoveList] = useState([]);

  function handleShiny() {
    return setIsShiny(!isShiny);
  }
  useEffect(() => {
    const movesUrl = pokemon?.moves.map((move) => move.move.url);
    console.log("moves", movesUrl);
    axios
      .get(...movesUrl)
      .then((res) => res.data)
      .then((data) => setMoveList([data]));
  }, []);
  //   console.log(pokemon?.moves[0].move.url);
  //   console.log(pokemon?.moves.map((move) => move.move.url));
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
            {moveList.map((move) => (
              <div className="pokemonMovesContainer">
                <div>{move.name}</div>
                <div>Power: {move.power}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
