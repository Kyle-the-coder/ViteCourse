import { EmptyCard } from "../components/EmptyCard";
import { baseApi } from "./baseApi";

export function getPokemon(input) {
  return baseApi
    .get(`pokemon/${input}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
