import { useRef } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const pokemon = useLoaderData();
  const pokeNameRef = useRef();

  return (
    <>
      <div className="container">
        <Form>
          <input type="text" ref={pokeNameRef} />
          <button>submit</button>
        </Form>
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
