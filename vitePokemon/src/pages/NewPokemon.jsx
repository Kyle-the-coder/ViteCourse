import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { EmptyCard } from "../components/EmptyCard";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../api/getPokemon";
import { getRandomNum } from "../api/getRandomNum";
import { v4 as uuidv4 } from "uuid";
import { handleCapture, handleRun } from "../functions/handleCapture";

function NewPokemon() {
  const [isCaptured, setIsCaptured] = useState(false);
  const [isBallThrown, setIsBallThrown] = useState(false);
  const [ballSpin, setBallSpin] = useState(false);
  const [catchMessage, setCatchMessage] = useState("");
  const [pokeBallCount, setPokeBallCount] = useState(() => {
    const count = localStorage.getItem("pokeballCount");
    if (count === null) return 10;
    return JSON.parse(count);
  });
  const { state } = useNavigation();
  const errors = useActionData() || null;

  const [pokemon, setPokemon] = useState(() => {
    const p = localStorage.getItem("pokemon");
    if (p === null) return null;
    return JSON.parse(p);
  });

  const [pokeList, setPokeList] = useState(() => {
    const list = localStorage.getItem("captureList");
    if (list === null) return [];
    return JSON.parse(list);
  });

  const [ballHit, setBallHit] = useState(null);

  useEffect(() => {
    const newPokemonInfo = localStorage.getItem("pokemon");
    setPokemon(JSON.parse(newPokemonInfo));
    const newPokemonList = localStorage.getItem("captureList");
    setPokeList(JSON.parse(newPokemonList));
    localStorage.setItem("pokeballCount", pokeBallCount);
    const isCap = localStorage.getItem("pokemon");
    if (isCap !== null) {
      setIsCaptured(JSON.parse(isCap)?.captured.capture);
    }
  }, [state, isCaptured, isBallThrown, catchMessage, ballHit]);

  function getAway() {
    setCatchMessage("You Got Away");
    handleRun(pokemon);
  }
  function handleBallThrown(pokeInfo) {
    setBallHit(null);
    const count = localStorage.getItem("pokeballCount");
    const ballHitRand = getRandomNum();

    //HANDLE POKEBALL COUNT IF NO POKEBALLS
    if (count <= 0) {
      setCatchMessage("You ran out of pokeballs");
      setPokeBallCount(0);
      localStorage.setItem("pokeballCount", pokeBallCount);
      handleRun(pokemon);
      //HANDLE POKEBALL CAPTURE IF HAVE POKEBALLS
    } else if (count > 0) {
      //LOWER POKEBALL COUNT BY 1
      setPokeBallCount(pokeBallCount - 1);
      localStorage.setItem("pokeballCount", pokeBallCount);
      setBallSpin(true);
      setIsBallThrown(true);
      setTimeout(() => {
        //BALL HIT SUCCESSFULLY
        if (ballHitRand >= 0 && ballHitRand <= 7) {
          setBallHit(true);
          setIsBallThrown(false);
          setTimeout(() => {
            handleCapture(pokeInfo);
            setBallSpin(false);
            setCatchMessage("Pokemon got away");
          }, [4000]);
          //BALL HIT UNSUCCESSFULLY
        } else if (ballHitRand > 7 && ballHitRand <= 10) {
          setIsBallThrown(false);
          setBallHit(false);
          setBallSpin(false);
        }
      }, [1000]);
    }
  }
  function handleGetMorePokeballs() {
    const rand = getRandomNum();
    setPokeBallCount(rand);
  }
  // console.log("thrown", isBallThrown);
  // console.log("ball", ballHit);
  // console.log("captured", isCaptured);

  return (
    <>
      <div className="container">
        <div className="title">
          <h1>Search in the wild grass:</h1>
        </div>
        <Form method="post">
          <input
            type="text"
            name="name"
            placeholder="Enter a pokemon's name..."
            defaultValue={pokemon?.name}
          />
          <button onClick={() => setBallHit(null)}>submit</button>
        </Form>
        <div className="errorContainer">
          <p className="errorMessage">{errors != null && errors.message}</p>
        </div>

        <div className="resultsContainer">
          {pokemon === null ? (
            <>
              <div className="resultsContainer">
                <h1>{catchMessage}</h1>
                <h1>Pokeball Count: {pokeBallCount}</h1>
                {pokeBallCount === 0 ? (
                  <>
                    <button
                      className="btn"
                      onClick={() => handleGetMorePokeballs()}
                    >
                      Get More Pokeballs
                    </button>
                  </>
                ) : (
                  ""
                )}
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
                captured={pokemon.captured.capture}
                setIsCaptured={setIsCaptured}
                isCaptured={isCaptured}
                ballSpin={ballSpin}
                isBallThrown={isBallThrown}
                isShiny={pokemon.shiny}
                starRating={pokemon.starRating}
              />
              <div className="captureContainer">
                <p>
                  Throw Status:{" "}
                  <span className="captureStatus">
                    {isBallThrown ? (
                      <>ball is thrown...</>
                    ) : (
                      "" ||
                      (ballHit === null
                        ? "ball is not thrown..."
                        : ballHit === true
                        ? "ball hit"
                        : "ball missed")
                    )}
                  </span>
                </p>
                <p>
                  Capture Status:{" "}
                  <span className="captureStatus">
                    {isCaptured
                      ? "captured!"
                      : ballHit === true && ballSpin === false
                      ? "pokemon got out"
                      : "not captured"}
                  </span>
                </p>
                <p>Pokeball Count: {pokeBallCount}</p>
                <h1>What will you do?</h1>
                <div>
                  <button
                    onClick={() => {
                      handleBallThrown(JSON.parse(pokemon.pokeInfo));
                    }}
                    className="btn"
                    disabled={pokemon.captured.capture}
                  >
                    Throw Pokeball
                  </button>
                  <button onClick={() => getAway()} className="btn">
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
  const randomUUID = uuidv4();
  const errors = {};
  const formData = await request.formData();
  console.log(formData);
  const searchName = formData.get("name");
  console.log(searchName);
  if (searchName.length <= 0) {
    errors.message = "you must enter a pokemon name";
    return errors;
  }
  const pokeInfoSearch = await getPokemon(searchName.toLowerCase());
  localStorage.setItem("ballHit", false);

  //HANDLE SHINY CHANCE
  let isShiny = null;
  const shinyRand = getRandomNum();
  if (shinyRand >= 5) {
    isShiny = true;
  } else if (shinyRand < 5) {
    isShiny = false;
  }

  //HANDLE STAR RATING
  const starRand = getRandomNum();
  let starNum = 0;
  if (starRand >= 0 && starRand <= 5) {
    starNum = starNum + 1;
  } else if (starRand > 5 && starRand <= 8) {
    starNum = starNum + 2;
    pokeInfoSearch.stats.find((stat) => {
      if (stat.stat.name === "hp") {
        stat.base_stat += 10;
      }
    });
  } else if (starRand > 8 && starRand <= 10) {
    starNum = starNum + 3;
    pokeInfoSearch.stats.find((stat) => {
      if (stat.stat.name === "hp") {
        stat.base_stat += 20;
      }
    });
  }

  //HANDLE BAD REQUEST
  if (pokeInfoSearch === undefined) {
    errors.message = "bad request, try again";
    return errors;
  }

  //HANDLE CURRENT SEARCH
  const pokeInfo = JSON.stringify(pokeInfoSearch);
  const newList = {
    pokeInfo,
    captured: { capture: false, release: false },
    shiny: isShiny,
    key: randomUUID,
    starRating: starNum,
  };
  localStorage.setItem("pokemon", JSON.stringify(newList));

  return null;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
