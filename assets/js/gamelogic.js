const control = { firstPick: undefined, isPaused: false, matches: 0 };

const clickCard = (card) => {
  const [front, back] = getFrontandBackFromCard(card);

  if (front.classList.contains("rotate") || control.isPaused) {
    return;
  }
  gameLogic(card, front, back);
};

const gameLogic = (card, front, back) => {
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
