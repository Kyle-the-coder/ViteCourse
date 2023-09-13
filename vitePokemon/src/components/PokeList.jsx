import { useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokemonCard } from "./PokemonCard";

export function PokeList({
  pokeList,
  isCaptured,
  setIsCaptured,
  isReleased,
  setIsReleased,
}) {
  const { state } = useNavigation();
  const [isBallThrown, setIsBallThrown] = useState(false);
  console.log(pokeList.map((poke) => poke.starRating));
  return (
    <>
      {" "}
      <div className="card-grid">
        {pokeList.map((pokemon) => (
          <div className="gridContainer" key={pokemon.key}>
            <PokemonCard
              pokemon={pokemon.pokeInfo}
              state={state}
              captured={pokemon.captured.capture}
              setIsCaptured={setIsCaptured}
              isCaptured={isCaptured}
              isShiny={pokemon.shiny}
              isBallThrown={isBallThrown}
              pokeKey={pokemon.key}
              isReleased={isReleased}
              setIsReleased={setIsReleased}
              starRating={pokemon.starRating}
            />
          </div>
        ))}
      </div>
    </>
  );
}
