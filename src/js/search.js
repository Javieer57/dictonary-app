const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const error = document.getElementById("input-error");

const showError = () => {
  input.parentNode.classList.add("input-with-icon--error");
  error.innerText = "Whoops, can’t be empty…";
  input.focus();
};

const fetchWord = async (word) => {
  try {
    const resp = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await resp.json();

    if (resp.ok) {
      showResults(data);
    } else {
      showNotFound(data);
    }
  } catch (error) {
    console.error(error);
  }
};

const showResults = (data) => {
  console.log(data);
};

const showNotFound = (data) => {
  console.log(data);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = input.value.trim();

  if (inputValue === "") {
    showError();
    return;
  }

  input.parentNode.classList.remove("input-with-icon--error");
  error.innerText = "";
  fetchWord(inputValue);
});

input.addEventListener("keydown", function (e) {
  const previousValue = e.target.value;
  const pressedKey = e.key;
  const cursorPosition = e.target.selectionStart;
  const newValue =
    previousValue.slice(0, cursorPosition) +
    pressedKey +
    previousValue.slice(cursorPosition);

  if (!/^[A-Za-z]+$/.test(newValue)) {
    e.preventDefault();
  }
});