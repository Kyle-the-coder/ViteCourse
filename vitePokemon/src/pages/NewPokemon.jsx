import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const { state } = useNavigation();

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
    const newPokemonInfo = localStorage.getItem("pokemon");
    setPokemon(JSON.parse(newPokemonInfo));

    const newPokemonList = localStorage.getItem("pokeList");
    setPokeList(JSON.parse(newPokemonList));
  }, [state]);

  return (
    <>
      <div className="container">
        <div className="title">
          <h1>Find a pokemon:</h1>
        </div>
        <Form method="post">
          <input type="text" name="name" defaultValue={pokemon?.name} />
          <button>submit</button>
        </Form>
        {isMounted ? (
          <div className="resultsContainer">
            <h1>Search Results:</h1>
            <PokemonCard pokemon={pokemon} />
          </div>
        ) : (
          <></>
        )}
        <div className="recentSearchListContainer">
          <div>
            <h1>Recent Searches:</h1>
          </div>
          <div className="card-grid" key={pokemon.id}>
            {pokeList
              ?.slice() // Create a shallow copy of the array
              .reverse() // Reverse the order of the copied array
              .map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} /> // Don't forget to add a key to each mapped component
              ))}
          </div>
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
