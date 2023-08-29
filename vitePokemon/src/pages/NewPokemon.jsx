import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const pokemon = useActionData();
  const [localOrInput, setLocalOrInput] = useState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (pokemon !== undefined) {
      setIsMounted(true);
    }
    const poke = localStorage.getItem("pokemon");

    if (pokemon === undefined && poke.length >= 0) {
      setIsMounted(true);
      setLocalOrInput(JSON.parse(poke));
    }
    if (pokemon != undefined) {
      setLocalOrInput(pokemon);
    }
  }, [pokemon]);

  return (
    <>
      <div className="container">
        <Form method="post">
          <input type="text" name="name" defaultValue={localOrInput?.name} />
          <button>submit</button>
        </Form>
        {isMounted ? (
          <div className="resultsContainer">
            <img src={localOrInput?.sprites?.front_default} />
            {localOrInput?.name}
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
  console.log(searchName);
  const pokemon = await getPokemon(searchName);
  localStorage.setItem("pokemon", JSON.stringify(pokemon));
  return pokemon;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
