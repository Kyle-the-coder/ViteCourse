import { Form, useLoaderData } from "react-router-dom";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
  const pokemon = useLoaderData();

  return (
    <>
      <div className="container">
        <Form method="post">
          <input type="text" name="name" />
          <button>submit</button>
        </Form>
      </div>
    </>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const searchName = formData.get("name");
  return getPokemon(searchName);
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
