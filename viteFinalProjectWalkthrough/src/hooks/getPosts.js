import { baseApi } from "./baseApi";

export function getPosts(options) {
  return baseApi.get("posts", options).then((res) => res.data);
}

export function getPost(options) {
  return baseApi
    .get(`posts/${options.postId}`, options.signal)
    .then((res) => res.data);
}
