import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState();
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(undefined);
    setIsErr(false);
    setIsLoading(true);

    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then(setData)
      .catch((err) => {
        if (err.name === "Abort Error") {
          return;
        }
        setIsErr(true);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, isErr };
}
