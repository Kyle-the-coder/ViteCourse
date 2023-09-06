export function handleCapture(pokeInfo) {
  //FALSEY INPUT
  if (!pokemon.captured) {
    setIsBallThrown(true);
    const rand = getRandomNum();
    const runRand = getRandomNum();
    console.log(runRand);
    setTimeout(() => {
      if (runRand >= 3) {
        if (rand >= 7) {
          //HANDLE SINGLE POKEMON UPDATE
          const pokemon = JSON.parse(localStorage.getItem("pokemon"));
          pokemon.captured = true;
          localStorage.setItem("pokemon", JSON.stringify(pokemon));
          //HANDLE POKE LIST UPDATE
          const existingPokeList = localStorage.getItem("pokeList") || [];
          const newPokeList = JSON.parse(existingPokeList);
          const changeCapture = newPokeList.map((poke) => {
            if (poke.key === pokemon.key) {
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
      } else if (runRand < 3) {
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
