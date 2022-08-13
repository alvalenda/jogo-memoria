const pokeAPIBaseUrl = "https://pokeapi.co/api/v2/";
const pokemonContainer = document.querySelector("#pokemon-container");
const resetButton = document.querySelector("#reset-button");

const loadPokemon = async (pokemonNumber) => {
  const response = fetch(`${pokeAPIBaseUrl}pokemon/${pokemonNumber}`);
  return response;
};

const randomPokemon = async () => {
  const randomIds = new Set();
  while (randomIds.size < 8) {
    randomIds.add(Math.floor(Math.random() * 151) + 1);
  }
  return randomIds;
};

const buildPokemonArray = async () => {
  const randomIds = [...(await randomPokemon())];
  const promises = randomIds.map((id) => loadPokemon(id));
  const responses = await Promise.all(promises);
  const data = await Promise.all(responses.map((response) => response.json()));
  return data;
};

const displayPokemon = (pokepairs) => {
  pokepairs.sort((_) => Math.random() - 0.5);
  pokepairs.map((p) => console.log(p.name));

  pokepairs.forEach((pokemon) => {
    const { name, sprites } = pokemon;
    const { front_default } = sprites;
    const div = document.createElement("div", { className: "card" });
    const img = document.createElement("img");
    img.src = front_default;
    img.alt = name;
    div.appendChild(img);
    pokemonContainer.appendChild(div);
  });
};

const resetGame = async (pokeArray) => {
  pokeArray = await buildPokemonArray();
  pokemonContainer.textContent = "";
  displayPokemon([...pokeArray, ...pokeArray]);
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
