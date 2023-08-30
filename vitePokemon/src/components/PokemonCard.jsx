import "../styles/pokemonCard.css";
import background from "../assets/bg.webp";
import { useState } from "react";

export function PokemonCard({ pokemon }) {
  const [isShiny, setIsShiny] = useState(false);

  function handleShiny() {
    return setIsShiny(!isShiny);
  }
  console.log(pokemon?.moves[0].move.url);
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
            {pokemon?.moves[0].move.name}
          </div>
        </div>
      </div>
    </>
  );
}
