import { baseApi } from "./baseApi";

export function getComments(postId, options) {
  return baseApi.get("comments", options).then((res) => res.data);
}
