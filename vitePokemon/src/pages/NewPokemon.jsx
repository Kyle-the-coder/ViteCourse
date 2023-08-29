import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const newPokemon = useActionData();
  const [pokemon, setPokemon] = useState(() => {
    const p = localStorage.getItem("pokemon");
    console.log(p);
    if (p === undefined) return [];
    return JSON.parse(p);
  });
  const [localOrInput, setLocalOrInput] = useState();
  const [isMounted, setIsMounted] = useState(false);
  // const [pokeList, setPokeList] = useState(() => {
  //   const list = localStorage.getItem("pokeList");
  //   console.log(list);
  //   if (list === undefined) return [];
  //   return JSON.parse(list);
  // });

  console.log(pokemon);
  return (
    <>
      <div className="container">
        <Form method="post">
          <input type="text" name="name" defaultValue={pokemon?.name} />
          <button>submit</button>
        </Form>
        {isMounted ? (
          <div className="resultsContainer">
            <img src={pokemon?.sprites?.front_default} />
            {pokemon?.name}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const searchName = formData.get("name");
  const addPokemon = await getPokemon(searchName);
  console.log(addPokemon);
  localStorage.setItem("pokemon", JSON.stringify(addPokemon));

  localStorage.setItem("pokeList", []);
  return addPokemon;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
