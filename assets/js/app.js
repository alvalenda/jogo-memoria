const pokeAPIBaseUrl = "https://pokeapi.co/api/v2/";

const loadPokemon = async (pokemonNumber) => {
  const response = await fetch(`${pokeAPIBaseUrl}pokemon/${pokemonNumber}`);
  const data = await response.json();
  return data;
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
  const data = await Promise.all(promises);
  return data;
};

const main = async () => {
  const poke = await buildPokemonArray();
  console.log(poke);
};

main();
