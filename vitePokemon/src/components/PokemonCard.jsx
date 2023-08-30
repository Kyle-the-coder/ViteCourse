import "../styles/pokemonCard.css";
import background from "../assets/bg.webp";

export function PokemonCard({ pokemon }) {
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
              <img src={pokemon?.sprites?.front_shiny} />
              <button>shiny</button>
            </div>
            <div className="pokemonBackgroundImg">
              <img src={background} />
            </div>
          </div>
        </div>
        <div className="pokemonStatsContainer">
          <div className="pokemonNameContainer">{pokemon?.name}</div>
        </div>
      </div>
    </>
  );
}
