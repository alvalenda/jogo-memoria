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

const displayPokemon = (pokePairs) => {
  pokePairs.sort((_) => Math.random() - 0.5);
  //   pokePairs.map((p) => console.log(p.name));

  pokePairs.forEach((pokemon) => {
    const { name, sprites } = pokemon;
    const { front_default } = sprites;
    const div = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h2");
    div.className = "card";
    div.setAttribute("onclick", "clickCard(this)");
    div.setAttribute("data-name", pokemon.name);
    front.className = "front";
    back.className = "back rotate";
    [img.src, img.alt] = [front_default, name];
    title.innerText = name;
    div.appendChild(front);
    div.appendChild(back);
    back.appendChild(img);
    back.appendChild(title);
    pokemonContainer.appendChild(div);
  });
};

const clickCard = (card) => {
  console.log(card.dataset.name);
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
