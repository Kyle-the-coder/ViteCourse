import { json } from "express";
import { useState } from "react";

function useFetch(initialValue) {
  const [urlResults, setUrlResults] = useState(initialValue);

  fetch(initialValue)
    .then((res) => {
      if (res.status === 200) {
        res.json();
      }
    })
    .then((data) => {
      setUrlResults(data);
    })
    .catch((err) => console.log(err));
}

export default useFetch;
