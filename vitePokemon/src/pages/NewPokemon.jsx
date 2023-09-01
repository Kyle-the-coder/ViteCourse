import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { EmptyCard } from "../components/EmptyCard";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const { state } = useNavigation();

  const [pokemon, setPokemon] = useState(() => {
    const p = localStorage.getItem("pokemon");
    if (p === null) return null;
    return JSON.parse(p);
  });
  const [isMounted, setIsMounted] = useState(false);
  const [pokeList, setPokeList] = useState(() => {
    const list = localStorage.getItem("pokeList");
    if (list === null) return [];
    setIsMounted(true);
    return JSON.parse(list);
  });

  useEffect(() => {
    const newPokemonInfo = localStorage.getItem("pokemon");

    setPokemon(JSON.parse(newPokemonInfo));

    const newPokemonList = localStorage.getItem("pokeList");

    setPokeList(JSON.parse(newPokemonList));
    if (state === "submitting") {
      setIsMounted(true);
    }
  }, [state, isMounted]);

  function deletePokemon(pokeId) {
    const newPokeList = pokeList.filter((id) => id.id !== pokeId);
    localStorage.setItem("pokeList", JSON.stringify(newPokeList));
    const newInfo = localStorage.getItem("pokeList");
    setPokeList(JSON.parse(newInfo));
  }
  console.log(isMounted);
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
            {pokemon === null ? (
              <EmptyCard />
            ) : (
              <PokemonCard pokemon={pokemon} state={state} />
            )}
          </div>
        ) : (
          <>
            <div className="resultsContainer">
              <h1>Search Results</h1>
              <EmptyCard />
            </div>
          </>
        )}
        <div className="recentSearchListContainer">
          <div>
            <h1>Recent Searches:</h1>
          </div>
          <div className="card-grid">
            {pokeList
              ?.slice()
              .reverse()
              .map((pokemon) => (
                <div className="gridContainer" key={pokemon.id}>
                  <PokemonCard pokemon={pokemon.pokeInfo} state={state} />

                  <button
                    className="btn"
                    onClick={() => deletePokemon(pokemon.id)}
                  >
                    Delete
                  </button>
                </div>
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
  const pokeInfo = await getPokemon(searchName);
  //HANDLE RECENT SEARCH LIST
  if (existingPokeList.length > 0) {
    const newPokeList = JSON.parse(existingPokeList);
    const newList = [...newPokeList, { pokeInfo, captured: false }];
    localStorage.setItem("pokeList", JSON.stringify(newList));
  } else if (existingPokeList.length === 0) {
    console.log("it equals 0");
    existingPokeList.push({ pokeInfo, captured: false });
    localStorage.setItem("pokeList", JSON.stringify(existingPokeList));
  }
  //HANDLE CURRENT SEARCH
  localStorage.setItem("pokemon", JSON.stringify(pokeInfo));

  return pokeInfo;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
