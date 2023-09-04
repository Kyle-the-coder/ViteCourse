import { useNavigation } from "react-router-dom";
import { PokemonCard } from "./PokemonCard";

export function PokeList({ pokeList, isCaptured, setIsCaptured }) {
  const { state } = useNavigation();
  return (
    <>
      {" "}
      <div className="card-grid">
        {pokeList
          ?.slice()
          .reverse()
          .map((pokemon) => (
            <div className="gridContainer" key={pokemon.pokeInfo.id}>
              <PokemonCard
                key={pokemon.pokeInfo.id}
                pokemon={pokemon.pokeInfo}
                state={state}
                captured={pokemon.captured}
                setIsCaptured={setIsCaptured}
                isCaptured={isCaptured}
              />

              <button
                className="btn"
                onClick={() => deletePokemon(pokemon.pokeInfo.id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
