const pokeAPIBaseUrl = "https://pokeapi.co/api/v2/";
const pokemonContainer = document.querySelector("#pokemon-container");
const resetButton = document.querySelector("#reset-button");
const control = { firstPick: undefined, isPaused: false, matches: 0 };

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
//   console.log(card.dataset.name);
  const [front, back] = getFrontandBackFromCard(card);

  if (front.classList.contains("rotate") || control.isPaused) {
    return;
  }

  control.isPaused = true;
  rotateElements([front, back]);

  if (control.firstPick === undefined) {
    control.firstPick = card;
    control.isPaused = false;
  } else {
    const [firstPick, secondPick] = [
      control.firstPick.dataset.name,
      card.dataset.name,
    ];
    if (firstPick !== secondPick) {
      const [firstfront, firstback] = getFrontandBackFromCard(
        control.firstPick
      );
      setTimeout(() => {
        rotateElements([front, back, firstfront, firstback]);
        control.firstPick = undefined;
        control.isPaused = false;
      }, 600);
    } else {
      control.matches++;
      if (control.matches === 8) {
        console.log("You win!");
      }
      control.firstPick = undefined;
      control.isPaused = false;
    }
  }
};

const rotateElements = (elements) => {
  if (typeof elements !== "object" || !elements.length) return;

  elements.forEach((element) => {
    element.classList.toggle("rotate");
  });
};

const getFrontandBackFromCard = (card) => {
  const front = card.querySelector(".front");
  const back = card.querySelector(".back");
  return [front, back];
};

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
