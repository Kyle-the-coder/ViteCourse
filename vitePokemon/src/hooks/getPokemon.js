import { baseApi } from "./baseApi";

export function getPokemon() {
  return baseApi.get("pokemon/pikachu").then((res) => res.data);
}
