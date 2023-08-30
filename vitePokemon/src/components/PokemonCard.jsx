import "../styles/pokemonCard.css";
export function PokemonCard({ pokemon }) {
  return (
    <>
      {" "}
      <div className="cardContainer">
        <div className="pokemonImgContainer">
          <div className="pokemonImg"></div>
        </div>
        <div className="pokemonStatsContainer"></div>
        {/* <img src={pokemon?.sprites?.front_default} />
        {pokemon?.name} */}
      </div>
    </>
  );
}
