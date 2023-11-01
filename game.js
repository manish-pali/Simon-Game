const buttonColours = ["red", "blue", "green", "yellow"];
var gameParttern = [];

var userClickedPattern = [];

var keyPressedFirstTime = false;
var lvl = 0;

$(document).keypress(function () {
  if (!keyPressedFirstTime) {
    $("h1").html("level " + lvl);
    nextSequence();
    keyPressedFirstTime = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentlvl) {
  if (gameParttern[currentlvl] === userClickedPattern[currentlvl]) {
    if (userClickedPattern.length === gameParttern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}
function gameOver() {
  playSound("worng");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gameParttern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  lvl++;
  $("h1").html("level " + lvl);
}

function playSound(name) {
  var music = new Audio("./sounds/" + name + ".mp3");
  music.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(() => {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  lvl = 0;
  gameParttern = [];
  keyPressedFirstTime = false;
}
