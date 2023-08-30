import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const newPokemon = localStorage.getItem("pokemon");
  const [pokemon, setPokemon] = useState(() => {
    const p = localStorage.getItem("pokemon");
    if (p === undefined) return [];
    return JSON.parse(p);
  });
  const [isMounted, setIsMounted] = useState(false);
  const [pokeList, setPokeList] = useState(() => {
    const list = localStorage.getItem("pokeList");
    if (list === undefined) return [];
    setIsMounted(true);
    return JSON.parse(list);
  });

  useEffect(() => {
    const newInfo = localStorage.getItem("pokemon");
    console.log(newInfo);
    setPokemon(JSON.parse(newInfo));
  }, []);

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
        <div className="recentSearchListContainer">
          <div>
            <h1>Recent Searches:</h1>
          </div>
          {pokeList?.map((pokemon) => (
            <div key={pokemon.id}>{pokemon.name}</div>
          ))}
        </div>
      </div>
    </>
  );
}

async function action({ request }) {
  const existingPokeList = localStorage.getItem("pokeList") || [];
  const formData = await request.formData();
  const searchName = formData.get("name");
  const addPokemon = await getPokemon(searchName);
  //HANDLE RECENT SEARCH LIST
  if (existingPokeList.length > 0) {
    const newPokeList = JSON.parse(existingPokeList);
    const newList = [...newPokeList, addPokemon];
    localStorage.setItem("pokeList", JSON.stringify(newList));
  } else if (existingPokeList.length === 0) {
    console.log("it equals 0");
    existingPokeList.push(addPokemon);
    localStorage.setItem("pokeList", JSON.stringify(existingPokeList));
  }
  //HANDLE CURRENT SEARCH
  localStorage.setItem("pokemon", JSON.stringify(addPokemon));

  return addPokemon;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
