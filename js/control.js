
//game score init
var score = 0;

//generate a random number
function randomNumber(a){
    var num = Math.random();
    num = Math.round(a * num);
    return num;
}

$('.col-md-4').append("<div class='gameinfo'></div>");
$('.gameinfo').append("<p>Use arrow key to control the player and watch out the bugs who can bite you</p>");