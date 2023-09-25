import { useEffect, useRef, useState } from "react";
import "./styles.css";

function App() {
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const cards = cardContainerRef.current.querySelectorAll(".card");

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 1 }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    const lastCardObserver = new IntersectionObserver(
      (entries) => {
        const lastCard = entries[0];
        if (!lastCard.isIntersecting) return;
        loadNewCards();
        lastCardObserver.unobserve(lastCard.target);
        lastCardObserver.observe(
          cardContainerRef.current.querySelector(".card:last-child")
        );
      },
      { threshold: 1 }
    );

    lastCardObserver.observe(
      cardContainerRef.current.querySelector(".card:last-child")
    );
  }, []);

  function loadNewCards() {
    for (let i = 0; i < 10; i++) {
      const card = document.createElement("div");
      card.textContent = "New Card";
      card.className = "card";
      cardContainerRef.current.append(card);
    }
  }
  return (
    <>
      <div ref={cardContainerRef} className="cardContainer">
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

export default App;
