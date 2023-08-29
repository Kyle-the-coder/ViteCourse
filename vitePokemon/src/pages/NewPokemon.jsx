import { useLoaderData } from "react-router-dom";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const pokemon = useLoaderData();
  console.log(pokemon);
  return (
    <>
      <div className="container">
        <h1>New</h1>
        <img src={pokemon.sprites.front_default} width="500" />
      </div>
    </>
  );
}

function loader() {
  return getPokemon();
}
export const newPokemonRoute = {
  loader,
  element: <NewPokemon />,
};
