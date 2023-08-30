import "../styles/pokemonCard.css";
import background from "../assets/bg.webp";
import symbol from "../assets/electricSymbol.jpeg";
export function PokemonCard({ pokemon }) {
  console.log(pokemon.stats[0].stat.name);
  console.log(pokemon.stats[0].base_stat);
  return (
    <>
      {" "}
      <div className="cardContainer">
        <div className="titleContainer">
          {pokemon?.name}
          <div>
            {pokemon.stats[0].base_stat}

            {pokemon.stats[0].stat.name}
          </div>
        </div>

        <div className="pokemonImgContainer">
          <div className="pokemonImg">
            <div className="pokemonSprite">
              <img src={pokemon?.sprites?.front_default} />
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
