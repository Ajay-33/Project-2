window.onload = function () {
    showGameModal();
    handleGameTypeChange();
};

function showGameModal() {
    document.getElementById("modal").classList.remove("hidden");
}

const arr = [
    ["box1", "box2", "box3"],
    ["box4", "box5", "box6"],
    ["box7", "box8", "box9"],
];
let gameActive = true;
let start = 0;
var selectedOption;
var player1Name;
var player2Name;
var clicksound = new Audio("click.mp3");
var gamesound = new Audio("boop.mp3");
var win = new Audio("winning.mp3");
var reveal = new Audio("reveal.mp3");
var tie = new Audio("tie_sound.mp3");
var computerMoveDelay = 500;

function handleGameTypeChange() {
    selectedOption = document.getElementById("gameType").value;
    clicksound.play();
    if (selectedOption === "computer") {
        document.getElementById("player2_name").classList.add("hidden");
        document.getElementById("player2").classList.add("hidden");
    } else {
        document.getElementById("player2_name").classList.remove("hidden");
        document.getElementById("player2").classList.remove("hidden");
    }
}

function startGame() {
    player1Name = document.getElementById("player1").value;
    player2Name = document.getElementById("player2").value;
    if (player1Name.trim() === "") {
        alert("Please enter Player 1 name");
        return;
    }

    if (selectedOption === "2vs2") {
        player2Name = document.getElementById("player2").value;
        if (player2Name.trim() === "") {
            alert("Please enter Player 2 name");
            return;
        }
    } else {
        player2Name = "Computer";
    }
    reveal.play();
    document.getElementById("modal").style.display = "none";
    document.getElementById("player1name").innerHTML = "Player 1: " + player1Name;
    document.getElementById("player2name").innerHTML = "Player 2: " + player2Name;
    document
        .getElementById("player1name")
        .classList.add("transition-all", "duration-300", "transform", "scale-110");
    document
        .getElementById("player2name")
        .classList.add("transition-all", "duration-300", "transform", "scale-110");
}

function clicked(box) {
    if (!gameActive) {
        return;
    }
    var clickedBox = document.getElementById(box);
    var boxContent = document.getElementById(box).innerHTML;
    if (boxContent.trim() === "") {
        gamesound.currentTime = 0;
        gamesound.play();
        if (start % 2 == 0) {
            clickedBox.innerHTML = "X";
            check(box);

            setTimeout(() => {
                if (selectedOption === "computer" && gameActive) {
                    computer();
                }
            }, computerMoveDelay);
        } else {
            clickedBox.innerHTML = "O";
            check(box);
        }
        clickedBox.classList.add(
            "transition-all",
            "duration-300",
            "transform",
            "scale-90"
        );
        start++;
    }
}

function computer() {
    if (start < 8) {
        let row = Math.floor(Math.random() * 3);
        let col = Math.floor(Math.random() * 3);
        while (document.getElementById(arr[row][col]).innerHTML.trim() != "") {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
        }
        var clickedBox = document.getElementById(arr[row][col]);
        gamesound.play();
        clickedBox.classList.add(
            "opacity-100",
            "transition-all",
            "duration-300",
            "transform",
            "scale-90"
        );
        clickedBox.innerHTML = "O";
        check(arr[row][col]);
        start++;
    } else {
        return;
    }
}

function check(refbox) {
    if (!gameActive) {
        return;
    }
    var clickedBox = document.getElementById(refbox);
    var boxContent = clickedBox.innerHTML;

    let i, j;

    outerLoop: for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[i].length; j++) {
            if (refbox == arr[i][j]) {
                break outerLoop;
            }
        }
    }
    let cnt_vertical = 0;
    let cnt_horizontal = 0;
    let cnt_diagonal_1 = 0;
    let cnt_diagonal_2 = 0;
    let ref = 0;

    for (let counter = 0; counter < 3; counter++) {
        if (document.getElementById(arr[ref][j]).innerHTML == boxContent) {
            cnt_vertical++;
        }
        if (document.getElementById(arr[i][ref]).innerHTML == boxContent) {
            cnt_horizontal++;
        }
        if (document.getElementById(arr[ref][ref]).innerHTML == boxContent) {
            cnt_diagonal_1++;
        }
        if (document.getElementById(arr[ref][2 - ref]).innerHTML == boxContent) {
            cnt_diagonal_2++;
        }
        ref++;
    }

    if (
        cnt_vertical == 3 ||
        cnt_horizontal == 3 ||
        cnt_diagonal_1 == 3 ||
        cnt_diagonal_2 == 3
    ) {
        console.log("Succes Game");
        gameActive = false;
        if (cnt_vertical == 3) celebration([arr[0][j], arr[1][j], arr[2][j]]);
        else if (cnt_horizontal == 3)
            celebration([arr[i][0], arr[i][1], arr[i][2]]);
        else if (cnt_diagonal_1 == 3)
            celebration([arr[0][0], arr[1][1], arr[2][2]]);
        else if (cnt_diagonal_2 == 3)
            celebration([arr[0][2], arr[1][1], arr[2][0]]);
    } else if (start == 8) {
        gametie();
    }
}

function gametie() {
    tie.play();
    setTimeout(() => {
        document.getElementById("winnerText").innerText = "Oops,Its a Draw";
        document.getElementById("winnerModal").classList.remove("hidden");
        document.getElementById("winnerModal").classList.add("flex");
        gameActive = false;
    }, 1000);
}

function celebration(elements) {
    win.currentTime = 0;
    win.play();
    elements.forEach((elementId) => {
        document.getElementById(elementId).classList.add("blink");
    });

    setTimeout(() => {
        if (start % 2 != 0) {
            document.getElementById("winnerText").innerText =
                "Congratuations " + player1Name + "\nYou won :)";
        } else if (selectedOption == "computer") {
            document.getElementById("winnerText").innerText =
                "Better Luck Next Time :(";
        } else {
            document.getElementById("winnerText").innerText =
                "Congratuations " + player2Name + "\nYou won :)";
        }
        document.getElementById("winnerModal").classList.remove("hidden");
        document.getElementById("winnerModal").classList.add("flex");
    }, 1500);
}

function restartGame() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById("box" + i).innerHTML = "";
        document
            .getElementById("box" + i)
            .classList.remove(
                "blink",
                "opacity-100",
                "transition-all",
                "duration-300",
                "transform",
                "scale-90"
            );
    }
    document
        .getElementById("player1name")
        .classList.remove(
            "transition-all",
            "duration-300",
            "transform",
            "scale-110"
        );
    document
        .getElementById("player2name")
        .classList.remove(
            "transition-all",
            "duration-300",
            "transform",
            "scale-110"
        );
    gameActive = true;
    start = 0;
    document.getElementById("winnerText").innerText = "";
    document.getElementById("winnerModal").classList.add("hidden");
    document.getElementById("modal").style.display = "flex";
    handleGameTypeChange();
}