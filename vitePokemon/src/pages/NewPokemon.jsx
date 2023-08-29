import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const pokemon = useActionData();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (pokemon !== undefined) {
      setIsMounted(true);
    }
  }, [pokemon]);
  console.log(pokemon);
  console.log(isMounted);
  return (
    <>
      <div className="container">
        <Form method="post">
          <input type="text" name="name" />
          <button>submit</button>
        </Form>
        {isMounted ? (
          <div className="resultsContainer">
            <img src={pokemon.sprites.front_default} />
            {pokemon.name}
          </div>
        ) : (
          "loading"
        )}
      </div>
    </>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const searchName = formData.get("name");
  console.log(searchName);
  return getPokemon(searchName);
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
