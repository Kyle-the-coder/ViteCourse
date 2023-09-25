import { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const stringPage = page.toString();
    axios
      .get(
        `http://127.0.0.1:3000/photos-short-list?_page=${stringPage}&_limit=5`
      )
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(results);
  return (
    <>
      {" "}
      <div className="grid">
        <img src="https://via.placeholder.com/600/92c952" />
        <img src="https://via.placeholder.com/600/771796" />
        <img src="https://via.placeholder.com/600/24f355" />
        <img src="https://via.placeholder.com/600/d32776" />
        <img src="https://via.placeholder.com/600/f66b97" />
        <img src="https://via.placeholder.com/600/92c952" />
        <div className="skeleton">Loading...</div>
        <div className="skeleton">Loading...</div>
        <div className="skeleton">Loading...</div>
        <div className="skeleton">Loading...</div>
        <div className="skeleton">Loading...</div>
        <div className="skeleton">Loading...</div>

        {results?.map((item) => {
          return <img key={item.id} src={item.url} />;
        })}
      </div>
    </>
  );
}

export default App;
