const pokeAPIBaseUrl = "https://pokeapi.co/api/v2/";

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
  console.log(randomIds);
  const promises = randomIds.map((id) => loadPokemon(id));
  const responses = await Promise.all(promises);
  const data = await Promise.all(responses.map((response) => response.json()));
  return data;
};

const displayPokemon = (pokeArray) => {};

const resetGame = async (pokeArray) => {
  pokeArray = await buildPokemonArray();
  displayPokemon(pokeArray);
};

const main = async () => {
  const pokeArray = await buildPokemonArray();
  console.log(pokeArray);
};

main();
