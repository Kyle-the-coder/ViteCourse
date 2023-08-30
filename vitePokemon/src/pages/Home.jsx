import { Link } from "react-router-dom";
import pokemonStorageImg from "../assets/pokemonStorage.webp";
function Home() {
  return (
    <>
      <div className="container">
        <div className="welcomeContainer">
          <div className="welcomeTitle">
            <h1>Welcome to Pokemon Storage!</h1>
            <p>
              Here you can store, view info, and search for your favorite
              pokemon!
            </p>
            <Link to="/newpokemon" className="btn">
              Get Started
            </Link>
          </div>
          <div className="welcomeImage">
            <img src={pokemonStorageImg} width="400" height="200" />
          </div>
        </div>
      </div>
    </>
  );
}

function loader() {}

export const homeRoute = {
  element: <Home />,
};
