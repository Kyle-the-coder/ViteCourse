import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { parseLinkHeader } from "./parseLinkHeader";

const LIMIT = 10;
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const nextPhotoUrlRef = useRef();

  async function fetchPhotos(url, { overwrite = false } = {}) {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      const res = await fetch(url);
      nextPhotoUrlRef.current = parseLinkHeader(res.headers.get("Link")).next;
      const photos = await res.json();
      if (overwrite) {
        setPhotos(photos);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...photos]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const imageRef = useCallback((image) => {
    if (image === null || nextPhotoUrlRef.current === null) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        //TODO: LOAD NEXT ELEMENTS
        fetchPhotos(nextPhotoUrlRef.current);
        observer.unobserve(image);
      }
    });
    observer.observe(image);
  }, []);
  useEffect(() => {
    fetchPhotos(`http://localhost:3000/photos?_page=1&_limit=${LIMIT}`, {
      overwrite: true,
    });
  }, []);

  return (
    <div className="grid">
      {photos.map((photo, index) => {
        return (
          <img
            src={photo.url}
            ref={index === photos.length - 1 ? imageRef : undefined}
            key={photo.id}
          />
        );
      })}
      {isLoading &&
        Array.from({ length: LIMIT }, (_, index) => index).map((n) => {
          return (
            <div key={n} className="skeleton">
              Loading
            </div>
          );
        })}
    </div>
  );
}
