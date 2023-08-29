import { Form, useActionData } from "react-router-dom";
import { getPokemon } from "../hooks/getPokemon";

function NewPokemon() {
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
  const results = getPokemon(searchName);
  console.log();
  return formData;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
