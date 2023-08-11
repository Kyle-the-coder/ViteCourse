import { useState } from "react";

export function useFetch(initialValue) {
  const [urlResults, setUrlResults] = useState(initialValue);

  fetch(initialValue)
    .then((res) => {
      if (res.status === 200) {
        res.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));

  return urlResults;
}
