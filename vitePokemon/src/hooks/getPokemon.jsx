import { EmptyCard } from "../components/EmptyCard";
import { baseApi } from "./baseApi";

export function getPokemon(input) {
  return baseApi
    .get(`pokemon/${input}`)
    .then((res) => {
      console.log(res.status), res.data;
    })
    .catch((err) => (
      <div>
        <EmptyCard />
      </div>
    ));
}
