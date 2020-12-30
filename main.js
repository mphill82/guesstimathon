
var displayTimeRemaining;
var tries = 18;
var correctlist = new Array();  //this array will store 0 for each incorrect question and floor(b/a) for each correct question.  it will unpdate each time an answer is submitted.
var score = 10;


var questionset = [["How many athletes competed in the fist Winter Olympic Games?", 258],
["how many digits are in 500! (that is, 500 factorial)?", 1135],
["How many three digit prime numbers are there?", 143],
["How many stone blocks are in the Washington Monument?", 36491],
["How much does a Tesla model XS SUV with maximum configurations weigh in lbs?", 5531],
["How many words are in Moby Dick?", 206052]
];

//run after the HTML loads                    
$(function () {
    //listen for button clicks
    $("#start").click(function () {
        start();
    });
    $("#finish").click(function () {
        finish();
    });
    //create a card for each question in the questionset array and place them in the gameboard
    for (i = 0; i < questionset.length; i++) {
        correctlist.push(0); //sets default value to 0 for incorrect for each question.
        htmltext = "<div class='col'>\
                        <div class='card h-100'>\
                            <div class='card-header'>\
                                <div class='row'>\
                                    <div class='col' id='q"+ (i + 1) + "_title'>Question " + (i + 1) + "</div>\
                                    <div class='col' id='q"+ (i + 1) + "_status' style='text-align: right'></div>\
                                </div>\
                            </div>\
                            <div class='card-body'>\
                                <p class='card-text' id='q"+ (i + 1) + "_question'></p>\
                                <p class='card-text' id='q"+ (i + 1) + "_answer' style='color:blue'></p>\
                            </div>\
                            <div class='card-footer'>\
                                <div class='input-group input-group-sm mb-3'>\
                                    <span class='input-group-text'>(</span>\
                                    <input type='text' class='form-control' id='q"+ (i + 1) + "_a' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' disabled>\
                                    <span class='input-group-text'>,</span>\
                                    <input  type='text' class='form-control' id='q"+ (i + 1) + "_b' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' disabled>\
                                    <span class='input-group-text'>)</span>\
                                    <button  type='button' class='btn btn-primary btn-sm' id='q"+ (i + 1) + "_submit' onclick= 'submit(this)'disabled>Submit</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>";
        $("#gameboard").append(htmltext);
    }
    console.log(correct);
});

function start() {
    //enable inputs and buttons
    updateDisplay(true);
    //start the timer
    timer(30);
}

function finish() {
    //stop the timer
    timer(0);
    //calculate the final score
    for (x of correctlist){
        if (!x){
            score*=2;
        }
    }
    $("#score").text("Score: " + score);
    //disable inputs and buttons
    updateDisplay(false);

}

function updateDisplay(state) {
    ///update to start
    if (state) {
        //disable the start button, enable the finish button
        $("#start").attr("disabled", "disabled");
        $("#finish").removeAttr("disabled");

        //display the questions and enable the interval fields and submit buttons
        for (i = 0; i < questionset.length; i++) {
            $("#q" + (i + 1) + "_question").text(questionset[i][0]);
            $("#q" + (i + 1) + "_a").removeAttr("disabled");
            $("#q" + (i + 1) + "_b").removeAttr("disabled");
            $("#q" + (i + 1) + "_submit").removeAttr("disabled");
        }
    }

    else {
        //disable the finish button, emphasize the final score, deemphasize the other scoreboard items
        $("#finish").attr("disabled", "disabled");
        $("#time").css("fontWeight", "lighter");
        $("#tries").css("fontWeight", "lighter");
        $("#rawscore").css("fontWeight", "lighter");
        $("#finalscore").css("fontWeight", "bolder");


        //display the answers and disable the interval fields and submit buttons
        for (i = 0; i < questionset.length; i++) {
            $("#q" + (i + 1) + "_answer").text("Answer: " + questionset[i][1]);
            $("#q" + (i + 1) + "_a").attr("disabled", "disabled");
            $("#q" + (i + 1) + "_b").attr("disabled", "disabled");
            $("#q" + (i + 1) + "_submit").attr("disabled", "disabled");
        }

    }
}

function timer(state) {
    //start timer 
    if (state) {
        let start = new Date();
        start = start.getTime();
        //set end time
        var end = start + (state * 60 * 1000 + 1000);
        //loop the time display every second
        displayTimeRemaining = setInterval(function () {
            var now = new Date().getTime();
            timeLeft = end - now;
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            document.getElementById("time").innerHTML = "Time: " + minutes + ":" + seconds;
            if (timeLeft < 1000) {
                finish();
                return;
            }

        }, 1000);
    }
    //stop timer 
    else {
        clearInterval(displayTimeRemaining);
    }
}

function submit(buttonelement) {
    //get input data
    n = buttonelement.id.replace("_submit", "").replace("q", "");
    a = parseInt($("#q" + n + "_a").val());
    b = parseInt($("#q" + n + "_b").val());
    answer = questionset[n - 1][1];

    //check for invalid inputs
    if ((b <= a) || (a <= 0) || isNaN(a) || isNaN(b)) {
        console.log("error");
        $("#q" + n + "_status").html("Invalid <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='red' class='bi bi-exclamation-circle' viewBox='0 0 16 16'>\
        <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>\
        <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/>\
        </svg>");
        $("#q" + n + "_status").css("color", "red");
    }
    else{
        //check if the answer is incorrect
        if ((answer < a) || (answer > b)) {
            console.log("incorrect");
            correctlist[n - 1] = 0;
            console.log(correctlist);
            $("#q" + n + "_status").html("Incorrect <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='black' class='bi bi-x-circle' viewBox='0 0 16 16'>\
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>\
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>\
            </svg>");
            $("#q" + n + "_status").css("color", "black");

        }
        //the answer must be correct
        else {
            console.log("correct");
            correctlist[n - 1] = Math.floor(b / a);
            console.log(correctlist);
            $("#q" + n + "_status").html("Correct <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='Green' class='bi bi-check-circle-fill' viewBox='0 0 16 16'>\
            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'/>\
            </svg>");
            $("#q" + n + "_status").css("color", "Green");

        }

        //update scoreboard variables
        tries--;
        score=10;
        correctcount=0;
        for (x of correctlist){
            score+=x;
            if (x){
                correctcount++;
            }
        }

        //update scoreboard display
        $("#tries").text("Tries: " + tries);
        $("#score").text("Score: " + score);
        $("#correct").text("Correct: " + correctcount);

        
        //end games if tries reaches 0
        if (tries==0){
            finish();
        }
    }




    


}




