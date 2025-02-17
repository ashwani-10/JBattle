document.addEventListener("DOMContentLoaded", function () {
    const createGameButton = document.querySelector(".createGameCode");
    const joinGameButton  = document.querySelector(".joinGame"); 

    createGameButton.addEventListener("click", async function () {
        try {
            const response = await fetch("http://localhost:8080/api/v1/game/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await response.text();
            if (response.ok) {
                document.getElementById("gameCode").value = data;
                alert("Game Created! Your Game Code: " + data);
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            alert("Failed to create game. Please try again.");
            console.error("Error:", error);
        }
    });

    joinGameButton.addEventListener("click", async function () {
        const username = document.getElementById("username").value.trim();
        const gameCode = document.getElementById("joinGameCode").value.trim();

        if (!username) {
            alert("Please enter your name.");
            return;
        }

        if (!gameCode) {
            alert("Please enter a valid Game Code");
            return;
        }

        try{
            const response = await fetch(`http://localhost:8080/api/v1/game/join/${gameCode}?playerName=` +encodeURIComponent(username), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await response.json();
            if(response.ok){
                localStorage.setItem("userID",data.id);
                window.location.href = `waiting_area.html?gameCode=${gameCode}`;
            }else{
                alert("Invalid Game Code Enterd"+data.gameCode);
            }
        }catch(error){
            alert("Failed to join game");
            console.error("Error: "+error);
        }
        
    })
});
