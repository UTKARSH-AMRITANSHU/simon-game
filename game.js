var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var keyPressed = false;
var level = 0;


$(document).keypress(function(){
    if(keyPressed == false){
        $("h1").text("Level" + level);
        nextSequence();
        keyPressed = true;
    }
});



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    var selectedButton = $("#" + randomChosenColour);
    // console.log(selectedButton);
    selectedButton.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level += 1;
    $("h1").text("Level " + level);
    // alert(selectedButton);
}

// nextSequence();
function animatePress(currentColour){
    $("#" + currentColour).click(function(){
        $("#" + currentColour).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
    })
}

function startOver(){
    level = 0;
    gamePattern = [];
    keyPressed = false;
}

function checkAnswer(index){
    if(gamePattern[index] === userClickedPattern[index]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press any key to restart");

        startOver();
    }

}

function popUpFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}