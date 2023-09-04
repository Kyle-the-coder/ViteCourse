import background from "../assets/bg.webp";
import pokeBallEmpty from "../assets/pokeballEmpty.png";
import "../styles/pokemonCard.css";

export function NotFoundCard() {
  return (
    <>
      <div className="cardContainer">
        <div className="titleContainer">
          <p>Pokemon Name</p>
          <div>Stats</div>
        </div>

        <div className="pokemonImgContainer">
          <div className="pokemonImg">
            <div className="pokemonSprite">
              <p>No Pokemon Found</p>
            </div>
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
              <button disabled={true} className="pokedexBtn">
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
