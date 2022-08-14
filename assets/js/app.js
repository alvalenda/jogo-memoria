const resetButton = document.querySelector("#reset-button");

const resetGame = async (pokeArray) => {
  control.isPaused = true;
  control.firstPick = undefined;
  control.matches = 0;
  pokemonContainer.textContent = "";
  pokeArray = await buildPokemonArray();

  setTimeout(() => {
    displayPokemon([...pokeArray, ...pokeArray]);
    control.isPaused = false;
  }, 200);
};

const startGame = async (pokeArray) => {
  displayPokemon([...pokeArray, ...pokeArray]);
  resetButton.addEventListener("click", async () => {
    resetGame();
  });
};

const main = async () => {
  const pokeArray = await buildPokemonArray();
  startGame(pokeArray);
};
main();
