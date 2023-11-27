var cnt = 1;
var i = 0;
var start = false;
var colors = ["green", "red", "yellow", "blue"];
var ans = [];
var question = [];
// Buoc 1: Start game================================================================
// Nhan A -> Doi level -> Nhay btn -> Play sound
$(document).keypress(function (e) {
  if (!start) {
    $("body").removeClass("game-over");

    start = true;
    $("#level-title").text("Level " + cnt);
    ans = [];
    question = [];
    cnt = 1;

    var color = randomBtn();
    animationBtn(color);
    playSound(color);
  }
});

function randomBtn() {
  var randomNumber = Math.floor(Math.random() * colors.length);
  question.push(colors[randomNumber]);
  return colors[randomNumber];
}

function animationBtn(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  var sound = new Audio("/sounds/" + color + ".mp3");
  sound.play();
}

// Buoc 2: Click key events
$(".btn").click(function () {
  if (start) {
    var color = $(this).attr("id");
    ans.push(color);
    playSound(color);

    if (checkAnwser()) {
      i++;
      checkFinish();
      // i++;
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      start = false;
    }
  }
});

function checkAnwser() {
  var x = ans.length - 1;
  return ans[x] === question[x];
}

function checkFinish() {
  if (i === cnt) {
    cnt++;
    $("#level-title").text("Level " + cnt);
    ans = [];
    i = 0;
    var color = randomBtn();
    animationBtn(color);
    playSound(color);
  }
}
