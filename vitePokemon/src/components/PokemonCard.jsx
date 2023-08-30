import "../styles/pokemonCard.css";
export function PokemonCard({ pokemon }) {
  return (
    <>
      {" "}
      <div className="cardContainer">
        <div className="pokemonImgContainer">
          <div className="pokemonImg">
            <img src={pokemon?.sprites?.front_default} />
          </div>
        </div>
        <div className="pokemonStatsContainer">{pokemon?.name}</div>
      </div>
    </>
  );
}
