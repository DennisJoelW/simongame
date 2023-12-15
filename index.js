
var buttonColours  = ['red','blue','green','yellow']; // variable terdiri dari possible color

var gamePattern = []; // var array untuk mengisi pattern color dari game

var clickPattern = []; // var array untuk mengisi pattern color dari user

var level = 0; // variable level


$("h1").click(function() {  // ketika h1 diklik akan memulai game dengan boolean start = false. jika diklik maka 
    if (!start) {
      $("#level-title").text("Level " + level);
      nextSequence(); // akan memanggil function nextSequence
      start = true; // boolean start menjadi true
    }
});


$(".btn").click(function() { // memberi event listener click pada setiap button

    var userChosenColour = $(this).attr("id"); // mengambil attribute id dari button yang diklik dan dimasukkan ke variable userChosenColour
    clickPattern.push(userChosenColour);    // memasukkan userChosenColour ke array clickPattern dengan push
  
    makeSound(userChosenColour); // function makesound untuk buat suara sesuai dari warna
    animatePress(userChosenColour); // function animate

    checkAnswer(clickPattern.length-1); // function untuk mengecek jawaban
  });


function nextSequence() { // function next blink

    level++; // setiap kali function dipanggil level akan bertambah

    clickPattern = []; // clickPattern user juga akan diulang biar user bisa masukkin lagi semua setiap level
    
    $("#level-title").text("Level " + level);  // mengubah level

    var randomNumber = Math.random(); // variable random number untuk generate angka random
    randomNumber = randomNumber * 3 // kali 3 biar random number cuman bisa dari 0-3
    randomNumber = Math.round(randomNumber); // pembulatan random numbernya

    var chosenColor = buttonColours[randomNumber]; // variable untuk mengambil warna menggunakan random number dari array string buttonColours

    var chosenButton = $("."+chosenColor); //mengambil warna yang diambil dari komputer buat di bunyi dan animasi 

    chosenButton.fadeOut(100).fadeIn(100);
    
    makeSound(chosenColor);
    
    gamePattern.push(chosenColor);
    
    console.log(gamePattern)

}

var start = false;

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === clickPattern[currentLevel]) { // mengecek apakah input user pada level tertentu benar atau ga

        console.log("success");
  
        
        if (clickPattern.length === gamePattern.length){ // jika sudah benar semua dan length sudah tercukupi maka akan nextSequence() / tombol pilihan baru dari komputer
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {nextSequence();}, 1000); // function delay setTimeout buat delay selama 1000ms
  
        }
  
    } 

    else {
        wrongAndRestart(); 

    }

}

function wrongAndRestart () { // memanggil function ketika user salah dan game restrat
    $(".body").addClass("game-over").delay(500).queue(function(){
        $(".body").removeClass("game-over").dequeue();
    });
    $("h1").text("Game Over, press to start again");
    makeSound("wrong");
    start = false;
    level = 0;
    gamePattern = [];
}


function makeSound (color){ // function membuat suara menggunakan switch dan parameter "key" untuk case html
    switch (color) {
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
        break;
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
        break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
        break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
        break;

        default:
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break;
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  
}
















