var character = document.getElementById("character");
var block = document.getElementById("block");
var game = document.getElementById("game");
var subTitle = document.getElementById("subTitle");
var gameAlert = document.getElementById("gameAlert");
var gameStatus = document.getElementById("gameStatus");
var maxScore = document.getElementById("maxScore");
var newScore = document.getElementById("newScore");
var canJump = true;
var canCount = true;
var highestScore = 0;
var currentScore = 0;
document.getElementById("game").addEventListener("click", toggleJump);
document.getElementById("game").addEventListener("click", jump);
document.addEventListener("keypress", jump);
document.getElementById("playerName").addEventListener("click", toggleJump())
function toggleJump() {
    canJump = !canJump;
}
function jump() {
    if (!canJump) return;
    if (gameOver) {
        toggleGame();
        return;
    }
    if (character.classList == "animate") { return; }
    character.classList.add("animate");
    setTimeout(removeJump, 300); //300ms = length of animation
};
function removeJump() {
    character.classList.remove("animate");
}

function checkDead() {
    if (gameOver) return;
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
        toggleGame();
        showAlert("Game over! Your score is: " + currentScore);
    } else if (blockLeft < 20 && canCount) {
        canCount = false;
        currentScore += 1;
        newScore.value = currentScore;
    } else if (blockLeft > 20 && !canCount) {
        canCount = true;
    }
}

var gameOver = true;
setInterval(checkDead, 10);

gameStatus.innerText = 'Click to start game.'
function toggleGame() {
    gameOver = !gameOver;
    if (gameOver) {
        gameStatus.innerText = 'Click to start game.'
        if (currentScore > highestScore) {
            highestScore = currentScore;
        }
    } else {
        gameStatus.innerText = 'Click to jump the obstacle.'
        currentScore = 0; canCount = true;
    }
    maxScore.value = highestScore;
    newScore.value = currentScore;
    block.classList.toggle('block-animate')
}

function ChangeGameType(val) {
    if (val == 1) {
        game.className = game.className.replace('mario', 'dino')
        character.className = character.className.replace('mario', 'dino')
        block.className = block.className.replace('mario', 'dino')
        subTitle.innerText = 'Dinosuar Game';
    } else {
        game.className = game.className.replace('dino', 'mario')
        character.className = character.className.replace('dino', 'mario')
        block.className = block.className.replace('dino', 'mario')
        subTitle.innerText = 'Mario Game';
    }
}

function SetPlayerName(val) {
    document.getElementById("nameSection").innerText = val + " is playing";
}



// Get all elements with class="closebtn"
var close = document.getElementsByClassName("closebtn");
var i;
for (i = 0; i < close.length; i++) {
    close[i].parentElement.style.display = "none";
}
function showAlert(val){
    // Loop through all close buttons
    for (i = 0; i < close.length; i++) {
        close[i].parentElement.style.display = "block";
        if(currentScore >= highestScore && currentScore > 0)
            close[i].parentElement.className = "alert win";
            else
            close[i].parentElement.className = "alert lost";
        gameAlert.innerText = val;
        closeAler(close[i].parentElement);
    }
}
// Loop through all close buttons
for (i = 0; i < close.length; i++) {
    // When someone clicks on a close button
    close[i].onclick = function () {

        // Get the parent of <span class="closebtn"> (<div class="alert">)
        var div = btn.parentElement;
        // Set the opacity of div to 0 (transparent)
        div.style.opacity = "0";
        closeAler(div);

    }
}

function closeAler(div){

        // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
        setTimeout(function () { 
            div.style.display = "none";
            div.style.opacity = "100";
         }, 3000);
}