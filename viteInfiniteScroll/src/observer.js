const cards = document.querySelectorAll(".card");
console.log(cards);

const observer = new IntersectionObserver((entries) => {
  console.log(entries);
});

observer.observe(cards[0]);
