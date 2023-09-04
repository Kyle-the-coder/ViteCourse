import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { EmptyCard } from "../components/EmptyCard";
import { PokeList } from "../components/PokeList";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../hooks/getPokemon";
import { getRandomNum } from "../hooks/getRandomNum";

function NewPokemon() {
  const [isCaptured, setIsCaptured] = useState(false);
  const [isBallThrown, setIsBallThrown] = useState(false);
  const [catchMessage, setCatchMessage] = useState("");
  const { state } = useNavigation();
  const errors = useActionData() || null;

  const [pokemon, setPokemon] = useState(() => {
    const p = localStorage.getItem("pokemon");
    if (p === null) return null;
    return JSON.parse(p);
  });

  const [pokeList, setPokeList] = useState(() => {
    const list = localStorage.getItem("pokeList");
    if (list === null) return [];
    return JSON.parse(list);
  });

  useEffect(() => {
    const newPokemonInfo = localStorage.getItem("pokemon");
    setPokemon(JSON.parse(newPokemonInfo));
    const newPokemonList = localStorage.getItem("pokeList");
    setPokeList(JSON.parse(newPokemonList));
  }, [state, isCaptured, isBallThrown]);

  function deletePokemon(pokeId) {
    const newPokeList = pokeList.filter((id) => id.id !== pokeId);
    localStorage.setItem("pokeList", JSON.stringify(newPokeList));
    const newInfo = localStorage.getItem("pokeList");
    setPokeList(JSON.parse(newInfo));
  }

  function handleRun() {
    localStorage.setItem("pokemon", null);
    const newInfo = localStorage.getItem("pokemon");
    const getInfo = JSON.parse(newInfo);
    setCatchMessage("Pokemon Got Away!");
    setPokemon(getInfo);
  }

  function handleCapture(pokeInfo) {
    //FALSEY INPUT
    if (!pokemon.captured) {
      setIsBallThrown(true);
      const rand = getRandomNum();
      const runRand = getRandomNum();
      console.log(runRand);
      setTimeout(() => {
        if (runRand >= 6) {
          if (rand >= 7) {
            //HANDLE SINGLE POKEMON UPDATE
            const pokemon = JSON.parse(localStorage.getItem("pokemon"));
            pokemon.captured = true;
            localStorage.setItem("pokemon", JSON.stringify(pokemon));
            //HANDLE POKE LIST UPDATE
            const existingPokeList = localStorage.getItem("pokeList") || [];
            const newPokeList = JSON.parse(existingPokeList);
            const changeCapture = newPokeList.map((poke) => {
              if (poke.pokeInfo.id === pokeInfo.id) {
                return { ...poke, captured: true };
              } else {
                return { ...poke };
              }
            });

            setIsBallThrown(false);
            localStorage.setItem("pokeList", JSON.stringify(changeCapture));
          } else if (rand < 7) {
            console.log("did not capture");
            setIsBallThrown(false);
            return;
          }
          setIsBallThrown(false);
        } else if (runRand < 6) {
          return handleRun();
        }
      }, [2000]);

      //TRUTHY INPUT
    } else if (pokemon.captured) {
      //HANDLE SINGLE POKEMON UPDATE
      localStorage.setItem("capturedInfo", JSON.stringify([]));
      const pokemon = JSON.parse(localStorage.getItem("pokemon"));
      pokemon.captured = false;
      localStorage.setItem("pokemon", JSON.stringify(pokemon));
      //HANDLE POKELIST UPDATE
      const existingPokeList = localStorage.getItem("pokeList");
      const newPokeList = JSON.parse(existingPokeList);
      const changeCapture = newPokeList.map((poke) => {
        if (poke.pokeInfo.id === pokeInfo.id) {
          return { ...poke, captured: false };
        } else {
          return { ...poke };
        }
      });
      localStorage.setItem("pokeList", JSON.stringify(changeCapture));
    }
  }

  return (
    <>
      <div className="container">
        <div className="title">
          <h1>Search in the wild grass:</h1>
        </div>
        <Form method="post">
          <input type="text" name="name" defaultValue={pokemon?.name} />
          <button>submit</button>
        </Form>
        <div className="errorContainer">
          <p className="errorMessage">{errors != null && errors.message}</p>
        </div>

        <div className="resultsContainer">
          {pokemon === null ? (
            <>
              <div className="resultsContainer">
                <h1>{catchMessage}</h1>
                <EmptyCard />
              </div>
            </>
          ) : (
            <>
              {pokemon && (
                <>
                  <div>{pokemon.shiny ? <h1>Wow!</h1> : ""}</div>
                  <h1>
                    You Found a wild {pokemon.shiny ? "Shiny " : ""}
                    {JSON.parse(pokemon?.pokeInfo)
                      .name.charAt(0)
                      .toUpperCase() +
                      JSON.parse(pokemon?.pokeInfo).name.slice(1).toLowerCase()}
                    !
                  </h1>
                </>
              )}
              <PokemonCard
                pokemon={JSON.parse(pokemon.pokeInfo)}
                state={state}
                captured={pokemon.captured}
                setIsCaptured={setIsCaptured}
                isCaptured={isCaptured}
                isBallThrown={isBallThrown}
                isShiny={pokemon.shiny}
              />
              <div className="captureContainer">
                <p>
                  Capture Status:{" "}
                  <span className="captureStatus">
                    {isBallThrown
                      ? "capturing..."
                      : pokemon.captured
                      ? "Captured"
                      : "Not captured"}
                  </span>
                </p>
                <h1>What will you do?</h1>
                <div>
                  <button
                    onClick={() => {
                      setIsCaptured(!isCaptured);
                      handleCapture(JSON.parse(pokemon.pokeInfo));
                    }}
                    className="btn"
                    disabled={pokemon.captured}
                  >
                    Capture
                  </button>
                  <button onClick={() => handleRun()} className="btn">
                    Run
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

async function action({ request }) {
  const errors = {};
  const existingPokeList = localStorage.getItem("pokeList") || [];
  const formData = await request.formData();
  const searchName = formData.get("name");
  const pokeInfoSearch = await getPokemon(searchName.toLowerCase());

  //HANDLE SHINY CHANCE
  let isShiny = null;
  const shinyRand = getRandomNum();
  if (shinyRand >= 5) {
    isShiny = true;
  } else if (shinyRand < 5) {
    isShiny = false;
  }

  //HANDLE BAD REQUEST
  if (pokeInfoSearch === undefined) {
    errors.message = "bad request, try again";
    return errors;
  }
  //HANDLE RECENT SEARCH LIST
  if (existingPokeList.length > 0) {
    const newPokeList = JSON.parse(existingPokeList);
    const newList = [
      ...newPokeList,
      { pokeInfo: pokeInfoSearch, captured: false, shiny: isShiny },
    ];
    localStorage.setItem("pokeList", JSON.stringify(newList));
  } else if (existingPokeList.length === 0) {
    console.log("it equals 0");
    existingPokeList.push({
      pokeInfo: pokeInfoSearch,
      captured: false,
      shiny: isShiny,
    });
    localStorage.setItem("pokeList", JSON.stringify(existingPokeList));
  }
  //HANDLE CURRENT SEARCH
  const pokeInfo = JSON.stringify(pokeInfoSearch);
  const newList = { pokeInfo, captured: false, shiny: isShiny };
  localStorage.setItem("pokemon", JSON.stringify(newList));

  return null;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
