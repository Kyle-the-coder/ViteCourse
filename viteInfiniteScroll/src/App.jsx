import { useState } from "react";
import "./styles.css";

function App() {
  return (
    <>
      <div className="cardContainer">
        <div className="card">This is first Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">Card</div>
        <div className="card">This is last Card</div>
      </div>
    </>
  );
}

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  { threshold: 1 }
);
cards.forEach((card) => {
  observer.observe(card);
});

export default App;
