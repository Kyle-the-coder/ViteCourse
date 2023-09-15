import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { EmptyCard } from "../components/EmptyCard";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../api/getPokemon";
import { getRandomNum } from "../api/getRandomNum";
import { v4 as uuidv4 } from "uuid";
import { handleCapture, handleRun } from "../functions/handleCapture";

function NewPokemon() {
  const { state } = useNavigation();
  const errors = useActionData() || null;
  //HANDLE POKEMON CAPTURE STATES
  const [isCaptured, setIsCaptured] = useState(false);
  const [isBallThrown, setIsBallThrown] = useState(false);
  const [ballHit, setBallHit] = useState(null);
  const [ballSpin, setBallSpin] = useState(false);
  const [isPokeballShown, setIsPokeballShown] = useState(true);
  const [catchMessage, setCatchMessage] = useState("");
  //LOCAL STORAGE STATES
  const [pokeBallCount, setPokeBallCount] = useState(() => {
    const count = localStorage.getItem("pokeballCount");
    if (count === null) return 10;
    return JSON.parse(count);
  });
  const [pokemon, setPokemon] = useState(() => {
    const p = localStorage.getItem("pokemon");
    if (p === null) return null;
    return JSON.parse(p);
  });

  //UPDATE ANY CHANGES FROM STORAGE AND RENDER ON SCREEN
  useEffect(() => {
    const newPokemonInfo = localStorage.getItem("pokemon");
    setPokemon(JSON.parse(newPokemonInfo));
    localStorage.setItem("pokeballCount", pokeBallCount);
    const isCap = localStorage.getItem("pokemon");
    if (isCap !== null) {
      setIsCaptured(JSON.parse(isCap)?.captured.capture);
    }
  }, [state, ballSpin, catchMessage]);

  //RUN AWAY FUNCTION
  function handleGetAway() {
    setCatchMessage("You Got Away");
    handleRun(pokemon);
  }
  //HANDLE POKEBALL THROW FUNCTION
  function handleBallThrown(pokeInfo) {
    //MAKE SURE BALLHIT IS NULL AND GATHER INFO
    setBallHit(null);
    const count = localStorage.getItem("pokeballCount");
    const ballHitRand = getRandomNum();

    //HANDLE POKEBALL THROW IF USER HAS NO POKEBALLS
    if (count <= 0) {
      setCatchMessage("You ran out of pokeballs");
      setPokeBallCount(0);
      localStorage.setItem("pokeballCount", pokeBallCount);
      handleRun(pokemon);
      //HANDLE POKEBALL THROW IF USER HAS POKEBALLS
    } else if (count > 0) {
      //LOWER POKEBALL COUNT BY 1
      setPokeBallCount(pokeBallCount - 1);
      localStorage.setItem("pokeballCount", pokeBallCount);
      //START THE ANIMATION
      setBallSpin(true);
      setIsBallThrown(true);
      //TIMEOUT TO ALLOW TIME TO PASS FOR ANIMATION
      setTimeout(() => {
        //BALL HIT SUCCESSFULLY
        if (ballHitRand >= 0 && ballHitRand <= 7) {
          //LET USER KNOW THE BALL HAS HIT THE POKEMON
          setBallHit(true);
          setIsBallThrown(false);
          //TIMEOUT TO SEE IF POKEMON GETS CAPTURED SUCCESSFULLY
          setTimeout(() => {
            handleCapture(pokeInfo);
            //IF POKEMON GOT AWAY
            setCatchMessage("Pokemon got away");
            setTimeout(() => {
              setBallSpin(false);
            }, [1000]);
          }, [4000]);
          //BALL HIT UNSUCCESSFULLY
        } else if (ballHitRand > 7 && ballHitRand <= 10) {
          //SET EVERYTHING TO FALSE FOR UNSUCCESSFUL THROW
          setIsBallThrown(false);
          setBallHit(false);
          setBallSpin(false);
        }
      }, [1000]);
    }
  }
  //FUNCTION FOR GETTING MORE POKEBALLS
  function handleGetMorePokeballs() {
    setPokeBallCount(10);
  }

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
                    {pokemon.captured.capture === true
                      ? `You Caught a wild ${pokemon.shiny ? "Shiny " : ""}
                    ${
                      pokemon?.pokeInfo.name.charAt(0).toUpperCase() +
                      pokemon?.pokeInfo.name.slice(1).toLowerCase()
                    }
                    ! `
                      : `You Found a wild ${pokemon.shiny ? "Shiny " : ""}
                    ${
                      pokemon?.pokeInfo.name.charAt(0).toUpperCase() +
                      pokemon?.pokeInfo.name.slice(1).toLowerCase()
                    }
                    ! `}
                  </h1>
                </>
              )}
              <PokemonCard
                pokemon={pokemon.pokeInfo}
                state={state}
                captured={pokemon.captured.capture}
                setIsCaptured={setIsCaptured}
                isCaptured={isCaptured}
                ballSpin={ballSpin}
                isShiny={pokemon.shiny}
                starRating={pokemon.starRating}
                ballHit={ballHit}
                isPokeballShown={isPokeballShown}
              />
              <div className="captureContainer">
                <p>
                  Throw Status:{" "}
                  <span className="captureStatus">
                    {isBallThrown ? (
                      <>ball is thrown...</>
                    ) : (
                      "" ||
                      (ballHit === null ? (
                        "ball is not thrown..."
                      ) : ballHit === true ? (
                        "ball hit!"
                      ) : (
                        <span className="redText">ball missed</span>
                      ))
                    )}
                  </span>
                </p>
                <p>
                  Capture Status:{" "}
                  <span className="captureStatus">
                    {isCaptured ? (
                      <span className="greenText">captured!</span>
                    ) : ballHit === true && ballSpin === false ? (
                      "pokemon got out"
                    ) : (
                      "not captured"
                    )}
                  </span>
                </p>
                <p>Pokeball Count: {pokeBallCount}</p>
                <h1>What will you do?</h1>
                <div>
                  <button
                    onClick={() => {
                      handleBallThrown(pokemon.pokeInfo);
                    }}
                    className="btn"
                    disabled={pokemon.captured.capture}
                  >
                    Throw Pokeball
                  </button>
                  <button
                    onClick={() => {
                      handleGetAway();
                    }}
                    className="btn"
                  >
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
  const searchName = formData.get("name");
  if (searchName.length <= 0) {
    errors.message = "you must enter a pokemon name";
    return errors;
  }
  const pokeInfoSearch = await getPokemon(searchName.toLowerCase());

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
  const pokeInfo = pokeInfoSearch;
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
