document.addEventListener("DOMContentLoaded", () => {

  const createBtn = document.getElementById("createBtn");
  const joinBtn = document.getElementById("joinBtn");

  const toggleCreate = document.getElementById("toggleCreate");
  const toggleJoin = document.getElementById("toggleJoin");

  const createSection = document.getElementById("createSection");
  const joinSection = document.getElementById("joinSection");

  const usernameInput = document.getElementById("username");
  const joinUsernameInput = document.getElementById("joinUsername");

  const categorySelect = document.getElementById("questionType");

  const generatedCodeInput = document.getElementById("generatedCode");
  const joinGameCodeInput = document.getElementById("joinGameCode");

  function showCreate() {
    createSection.classList.remove("hidden");
    joinSection.classList.add("hidden");

    toggleCreate.classList.add("active");
    toggleJoin.classList.remove("active");
  }

  function showJoin() {
    joinSection.classList.remove("hidden");
    createSection.classList.add("hidden");

    toggleJoin.classList.add("active");
    toggleCreate.classList.remove("active");
  }

  toggleCreate.addEventListener("click", showCreate);
  toggleJoin.addEventListener("click", showJoin);

  createBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const category = categorySelect.value;

    if (!username) {
      alert("Please enter your name");
      return;
    }

    if (!category) {
      alert("Please select a question category");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/game/create/${category}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const gameCode = await response.text();

      if (!response.ok) {
        alert("Failed to create game");
        return;
      }
      joinUsername.value = username;
      joinGameCode.value = gameCode;
      showJoin();

    } catch (error) {
      console.error(error);
      alert("Failed to create game. Please try again.");
    }
  });

  joinBtn.addEventListener("click", async () => {
    const username = joinUsernameInput.value.trim();
    const gameCode = joinGameCodeInput.value.trim();

    if (!username) {
      alert("Please enter your name");
      return;
    }

    if (!gameCode) {
      alert("Please enter a valid game code");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/game/join/${gameCode}?playerName=${encodeURIComponent(username)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Invalid game code");
        return;
      }

      localStorage.setItem("userID", data.id);

      window.location.href = `waiting_area.html?gameCode=${gameCode}`;

    } catch (error) {
      console.error(error);
      alert("Failed to join game");
    }
  });

});
