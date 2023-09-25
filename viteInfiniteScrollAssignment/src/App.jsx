import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const gridRef = useRef();
  const [results, setResults] = useState(null);
  const getColorSquares = useCallback(() => {
    const lastCard = gridRef.current.querySelector(".last");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
            const stringPage = (page + 1).toString();
            console.log("inside", page + 1);
            loadNewCards(stringPage);
            observer.unobserve(lastCard);
          }
        });
      },
      { rootMargin: "-100px" }
    );
    observer.observe(lastCard);
  }, [page]);

  function loadNewCards(stringPage) {
    axios
      .get(
        `http://127.0.0.1:3000/photos-short-list?_page=${stringPage}&_limit=10`
      )
      .then((res) => {
        if (res.data.length === 0) {
          return;
        }
        setResults((otherResults) => [...otherResults, ...res.data]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const stringPage = page.toString();
    axios
      .get(
        `http://127.0.0.1:3000/photos-short-list?_page=${stringPage}&_limit=10`
      )
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    results && getColorSquares();
  }, [results]);

  return (
    <>
      {" "}
      <div className="grid" ref={gridRef}>
        {results?.map((item, index) => {
          return (
            <Fragment key={index}>
              <img
                id="colorSquare"
                className={index === results.length - 1 ? "last" : ""}
                src={item.url}
              />
              {index === results.length - 1 ? (
                <div>This is the end of the list</div>
              ) : (
                <></>
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

export default App;
