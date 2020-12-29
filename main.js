
var displayTimeRemaining;

var questionset = [["How many steps to the top of the Eiffel tower?", 674],
["How many gold medals were given at the 2016 Summer Olympic Games?", 307],
["Evaluate ln(ln(1000000)) rounded to the nearest thousandth.", 2.626],
["How many toes do Hemingway's cats have?",6]];

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
        htmltext = "<div class='col'>\
                        <div class='card h-100'>\
                            <div class='card-header'>\
                                <div class='row'>\
                                    <div class='col' id='q"+(i+1)+"_title'>Question "+(i+1)+"</div>\
                                    <div class='col' id='q"+(i+1)+"_status' style='text-align: right'></div>\
                                </div>\
                            </div>\
                            <div class='card-body'>\
                                <p class='card-text' id='q"+(i+1)+"_question'></p>\
                                <p class='card-text' id='q"+(i+1)+"_answer'></p>\
                            </div>\
                            <div class='card-footer'>\
                                <div class='input-group input-group-sm mb-3'>\
                                    <span class='input-group-text'>(</span>\
                                    <input type='text' class='form-control' id='q"+(i+1)+"_a' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' disabled>\
                                    <span class='input-group-text'>,</span>\
                                    <input  type='text' class='form-control' id='q"+(i+1)+"_b' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm' disabled>\
                                    <span class='input-group-text'>)</span>\
                                    <button  type='button' class='btn btn-primary btn-sm' id='q"+(i+1)+"_submit' disabled>Submit</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>";
        $("#gameboard").append(htmltext);
    }

});

function start() {
    //enable inputs and buttons
    updateDisplay(true);
    //start the timer
    timer(30);
}

function finish() {
    //disable inputs and buttons
    updateDisplay(false);
    //stop the timer
    timer(0);
}

function updateDisplay(state) {
    ///update to start
    if (state) {
        //disable the start button, enable the finish button
        $("#start").attr("disabled", "disabled");
        $("#finish").removeAttr("disabled");

        //display the questions and enable the interval fields and submit buttons
        for (i=0;i<questionset.length;i++){
            $("#q"+(i+1)+"_question").text(questionset[i][0]);
            $("#q"+(i+1)+"_a").removeAttr("disabled");
            $("#q"+(i+1)+"_b").removeAttr("disabled");
            $("#q"+(i+1)+"_submit").removeAttr("disabled");
        }
    }

    else {
        //disable the finish button, emphasize the final score, deemphasize the other scoreboard items
        $("#finish").attr("disabled", "disabled");
        $("#time").css("fontWeight","lighter");
        $("#tries").css("fontWeight","lighter");
        $("#rawscore").css("fontWeight","lighter");
        $("#finalscore").css("fontWeight","bolder");
  

        //display the answers and disable the interval fields and submit buttons
        for (i=0;i<questionset.length;i++){
            $("#q"+(i+1)+"_answer").text("Answer: "+ questionset[i][1]);
            $("#q"+(i+1)+"_a").attr("disabled","disabled");
            $("#q"+(i+1)+"_b").attr("disabled","disabled");
            $("#q"+(i+1)+"_submit").attr("disabled","disabled");
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

function submit(n) {

}




