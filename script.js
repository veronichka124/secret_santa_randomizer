let names = [];
let initialNames = [];
let remainingNames = [];
let selectedName = null;

const randomNameDiv = document.getElementById("randomName");
const showNameBtn = document.getElementById("showNameBtn");
const refreshBtn = document.getElementById("refreshBtn");
const nameInputSection = document.getElementById("nameInputSection");
const mainApp = document.getElementById("mainApp");
const nameInput = document.getElementById("nameInput");
const submitNamesBtn = document.getElementById("submitNamesBtn");
const nameButtonsDiv = document.getElementById("nameButtons");

const maxSnowflakes = 100;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateSnowflakes() {
  const existingSnowflakes = document.querySelectorAll(".snowflake");
  if (existingSnowflakes.length < maxSnowflakes) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent = ".";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.fontSize = Math.random() * 24 + 10 + "px";
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.getElementById("snowflakesContainer").appendChild(snowflake);

    snowflake.addEventListener("animationend", () => {
      snowflake.remove();
    });
  }
}

setInterval(generateSnowflakes, 1000);

function updateRefreshButtonVisibility() {
  if (remainingNames.length < names.length) {
    refreshBtn.style.visibility = "visible";
  } else {
    refreshBtn.style.visibility = "hidden";
  }
}

function selectNameButton(event) {
  const buttons = document.querySelectorAll(".name-button");
  buttons.forEach((button) => button.classList.remove("selected"));
  event.target.classList.add("selected");
  selectedName = event.target.textContent;
  showNameBtn.style.visibility = "visible";
}

function createNameButtons() {
  nameButtonsDiv.innerHTML = "";
  names.forEach((name) => {
    const button = document.createElement("button");
    button.className = "name-button";
    button.textContent = name;
    button.addEventListener("click", selectNameButton);
    nameButtonsDiv.appendChild(button);
  });
}

function showRandomName() {
  if (remainingNames.length === 0) {
    alert("All names have been shown! Please refresh to start over.");
    return;
  }

  if (!selectedName) {
    alert("Please select your name before proceeding.");
    return;
  }

  showNameBtn.style.visibility = "hidden";
  refreshBtn.style.visibility = "hidden";
  randomNameDiv.textContent = "";

  let interval;
  let tempNames = [...names];
  shuffle(tempNames);
  let i = 0;

  interval = setInterval(() => {
    randomNameDiv.textContent = tempNames[i % tempNames.length];
    i++;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    // Ensure the selected name is excluded
    const validNames = remainingNames.filter((name) => name !== selectedName);
    if (validNames.length === 0) {
      alert("No valid names to pick from. Please refresh.");
      return;
    }

    const pickedIndex = Math.floor(Math.random() * validNames.length);
    const pickedName = validNames.splice(pickedIndex, 1)[0];

    // Update remaining names and display the picked name
    remainingNames = remainingNames.filter((name) => name !== pickedName);
    randomNameDiv.textContent = pickedName;

    showNameBtn.style.visibility = "visible";
    refreshBtn.style.visibility = "visible";
    updateRefreshButtonVisibility();
  }, 4000);
}

function refreshNames() {
  remainingNames = [...names];
  randomNameDiv.textContent = "";
  showNameBtn.style.visibility = "hidden";
  updateRefreshButtonVisibility();
  nameInput.value = initialNames.join(", ");
  nameInputSection.style.display = "flex";
  mainApp.style.display = "none";
}

function submitNames() {
  const inputText = nameInput.value.trim();
  if (inputText === "") {
    alert("Please enter at least one name.");
    return;
  }

  names = inputText
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
  if (names.length === 0) {
    alert("Please enter valid names.");
    return;
  }

  initialNames = [...names];
  remainingNames = [...names];
  nameInputSection.style.display = "none";
  mainApp.style.display = "flex";
  createNameButtons();
  updateRefreshButtonVisibility();
}

showNameBtn.addEventListener("click", showRandomName);
refreshBtn.addEventListener("click", refreshNames);
submitNamesBtn.addEventListener("click", submitNames);

updateRefreshButtonVisibility();
