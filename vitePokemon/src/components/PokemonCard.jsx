import "../styles/pokemonCard.css";
export function PokemonCard({ pokemon }) {
  return (
    <>
      {" "}
      <div className="cardContainer">
        <img src={pokemon?.sprites?.front_default} />
        {pokemon?.name}
      </div>
    </>
  );
}
