import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { EmptyCard } from "../components/EmptyCard";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const { state } = useNavigation();
  const [isCaptured, setIsCaptured] = useState(false);

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
  }, [state, isMounted, isCaptured]);

  function deletePokemon(pokeId) {
    const newPokeList = pokeList.filter((id) => id.id !== pokeId);
    localStorage.setItem("pokeList", JSON.stringify(newPokeList));
    const newInfo = localStorage.getItem("pokeList");
    setPokeList(JSON.parse(newInfo));
  }
  console.log(pokeList.map((poke) => poke.pokeInfoSearch.id));
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
              <PokemonCard
                pokemon={JSON.parse(pokemon.pokeInfo)}
                state={state}
                captured={pokemon.captured}
                setIsCaptured={setIsCaptured}
                isCaptured={isCaptured}
              />
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
                <div className="gridContainer" key={pokemon.pokeInfoSearch.id}>
                  <PokemonCard
                    key={pokemon.pokeInfoSearch.id}
                    pokemon={pokemon.pokeInfoSearch}
                    state={state}
                    captured={pokemon.captured}
                    setIsCaptured={setIsCaptured}
                    isCaptured={isCaptured}
                  />

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
  const pokeInfoSearch = await getPokemon(searchName);
  //HANDLE RECENT SEARCH LIST
  if (existingPokeList.length > 0) {
    const newPokeList = JSON.parse(existingPokeList);
    const newList = [...newPokeList, { pokeInfoSearch, captured: false }];
    localStorage.setItem("pokeList", JSON.stringify(newList));
  } else if (existingPokeList.length === 0) {
    console.log("it equals 0");
    existingPokeList.push({ pokeInfo: pokeInfoSearch, captured: false });
    localStorage.setItem("pokeList", JSON.stringify(existingPokeList));
  }
  //HANDLE CURRENT SEARCH
  const pokeInfo = JSON.stringify(pokeInfoSearch);
  const newList = { pokeInfo, captured: false };
  localStorage.setItem("pokemon", JSON.stringify(newList));

  return pokeInfo;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
