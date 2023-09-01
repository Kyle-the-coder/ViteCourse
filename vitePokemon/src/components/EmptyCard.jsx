import background from "../assets/bg.webp";
import pokeBallEmpty from "../assets/pokeballEmpty.png";
import "../styles/pokemonCard.css";

export function EmptyCard() {
  return (
    <>
      <div className="cardContainer">
        <div className="titleContainer">
          <h1>Pokemon Name</h1>
          <div>Stats</div>
        </div>

        <div className="pokemonImgContainer">
          <div className="pokemonImg">
            <div className="pokemonSprite"></div>
            <div className="pokemonBackgroundImg">
              <img src={background} />
            </div>
          </div>
        </div>

        <div className="pokemonStatsContainer">
          <div className="pokemonNameContainer">
            <div className="pokemonMovesContainer">
              <div>Move 1</div>
              <div>Move 2</div>
            </div>
            <div className="pokedexLink">
              <button disabled="true" className="btn">
                Pokedex
              </button>

              <img src={pokeBallEmpty} width="40" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
