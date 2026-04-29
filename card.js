var errors = 0;
var score = 0;
var matches = 0; // To track matched pairs
var totalMatches = 10; // Total pairs in the game
var cardList = [
    "rm",
    "jin",
    "suga",
    "jhope",
    "jimin",
    "v",
    "jungkook",
    "tiny tan",
    "group",
    "group1"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
    playSong(); // Start the song when the game starts
};

function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    // If cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;

        // Check if errors reached 5
        if (errors === 7) {
            stopSong(); // Stop the song
            document.getElementById("board").innerHTML = "<h2>Game Over! You've reached the maximum number of errors.</h2>";
            showButtons();
            return;
        }
    } else {
        matches += 1;
        score += 10;
        document.getElementById("score").innerText = score;

        if (matches === totalMatches) {
            stopSong(); // Stop the song when the game ends
            document.getElementById("board").innerHTML = "<h2>Congratulations! You win the game!</h2>";
            showButtons();
        }
    }

    card1Selected = null;
    card2Selected = null;
}

function showButtons() {
    document.getElementById("buttons").style.display = "block";
}


function restartGame() {
    errors = 0;
    matches = 0;
    score= 0;
    board = [];
    card1Selected = null;
    card2Selected = null;

    document.getElementById("errors").innerText = errors;
    document.getElementById("score").innerText = score; 
    document.getElementById("board").innerHTML = "";
    document.getElementById("buttons").style.display = "none";

    shuffleCards();
    startGame();
    playSong();
}


function exitGame() {
    document.getElementById("board").innerHTML = "<h2>Thank you for playing!</h2>";
    document.getElementById("buttons").style.display = "none";
    stopSong();
}



function playSong() {
    document.getElementById("gameSong").play();
}

function stopSong() {
    document.getElementById("gameSong").pause();
    document.getElementById("gameSong").currentTime = 0; // Reset to the beginning
}
