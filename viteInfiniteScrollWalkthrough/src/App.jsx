import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [photos, setPhotos] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/photos?_page=1&_limit=10")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(photos);
  return (
    <div className="grid">
      {photos?.map((photo) => {
        return <img src={photo.url} key={photo.id} />;
      })}
    </div>
  );
}
