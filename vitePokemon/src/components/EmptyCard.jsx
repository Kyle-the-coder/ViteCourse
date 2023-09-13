import background from "../assets/bg.webp";
import pokeBallEmpty from "../assets/pokeballEmpty.png";
import cardBack from "../assets/pokemonBackCard.jpeg";
import "../styles/cardBack.css";

export function EmptyCard() {
  return (
    <>
      <div className="emptyCardContainer">
        <img className="cardBackImg" src={cardBack} />
      </div>
    </>
  );
}
