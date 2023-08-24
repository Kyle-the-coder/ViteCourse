import { baseApi } from "./baseApi";

export function getTodos(options) {
  return baseApi.get("todos", options).then((res) => res.data);
}
