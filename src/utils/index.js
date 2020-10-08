export const getRandomItem = (array, multiplier = Math.random()) => {
  return array[Math.floor(multiplier * (array.length))];
}