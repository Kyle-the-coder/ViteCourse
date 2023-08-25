import { baseApi } from "./baseApi";

export function getTodos(options) {
  return baseApi.get("todos", options).then((res) => res.data);
}

export function getTodo(userId, options) {
  return baseApi.get(`todos?userId=${userId}`, options).then((res) => res.data);
}
