export function getRandomNum() {
  const min = 1; // Minimum value (inclusive)
  const max = 10; // Maximum value (inclusive)

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}
