import { baseApi } from "./baseApi";

export function getUsers(options) {
  return baseApi.get("users", options).then((res) => res.data);
}
