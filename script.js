const FLAMES = [
  { code: "F", label: "Friends", blurb: "You share an easy, playful vibe." },
  { code: "L", label: "Love", blurb: "Chemistry is strong—could be romantic." },
  { code: "A", label: "Affection", blurb: "Lots of warmth and admiration here." },
  { code: "M", label: "Marriage", blurb: "Long-term potential with steady trust." },
  { code: "E", label: "Enemies", blurb: "A fiery mix—maybe keep some distance." },
  { code: "S", label: "Siblings", blurb: "Feels like family, teasing included." },
];

const form = document.querySelector("#flames-form");
const resultBox = document.querySelector("#result");
const resetBtn = document.querySelector("#reset-btn");

const normalize = (value) => value.toLowerCase().replace(/[^a-z]/g, "");

const countRemainingLetters = (firstName, secondName) => {
  const first = normalize(firstName).split("");
  const second = normalize(secondName).split("");

  for (let i = 0; i < first.length; i += 1) {
    const letter = first[i];
    const matchIndex = second.indexOf(letter);
    if (matchIndex !== -1) {
      first[i] = "";
      second[matchIndex] = "";
    }
  }

  const remainingFirst = first.filter(Boolean).length;
  const remainingSecond = second.filter(Boolean).length;
  return remainingFirst + remainingSecond;
};

const resolveFlames = (count) => {
  if (count === 0) {
    return { code: "∞", label: "Twin Flame", blurb: "Perfect sync—no letters left!" };
  }

  const pool = [...FLAMES];
  let pointer = 0;

  while (pool.length > 1) {
    pointer = (pointer + count - 1) % pool.length;
    pool.splice(pointer, 1);
  }

  return pool[0];
};

const renderResult = ({ code, label, blurb }) => {
  resultBox.innerHTML = `
    <div class="label">${code}</div>
    <div class="value">${label}</div>
    <p>${blurb}</p>
  `;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const firstName = event.target.nameOne.value.trim();
  const secondName = event.target.nameTwo.value.trim();

  if (!firstName || !secondName) {
    resultBox.textContent = "Please enter both names.";
    return;
  }

  const remainingLetters = countRemainingLetters(firstName, secondName);
  const outcome = resolveFlames(remainingLetters);
  renderResult(outcome);
};

const handleReset = () => {
  form.reset();
  resultBox.textContent = "Enter two names to see their FLAMES story.";
};

form.addEventListener("submit", handleSubmit);
resetBtn.addEventListener("click", handleReset);

