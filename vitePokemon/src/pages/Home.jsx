import { useNavigate } from "react-router-dom";
import pokemonStorageImg from "../assets/pokemonStorage.webp";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="welcomeContainer">
          <div className="welcomeTitle">
            <h1>Welcome to Pokemon Stay Home!</h1>
            <p>
              A digital card collector game where you have to actually catch the
              cards in the wild!
            </p>
            <p>Find pokemon, catch pokemon, collect them all!</p>
            <button onClick={() => navigate("/newpokemon")} className="btn">
              Get Started
            </button>
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
