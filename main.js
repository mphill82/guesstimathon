var displayTimeRemaining;

function updateDisplay(state){
    ///update to start
    if (state){
        //disable the start button, enable the finish button
        document.getElementById("start").disabled=true;
        document.getElementById("finish").disabled=false;

        //display the questions and enable the interval fields and submit buttons
        document.getElementById("q1_question").style.display="block";
        document.getElementById("q1_a").disabled=false;
        document.getElementById("q1_b").disabled=false;
        document.getElementById("q1_submit").disabled=false;

        document.getElementById("q2_question").style.display="block";
        document.getElementById("q2_a").disabled=false;
        document.getElementById("q2_b").disabled=false;
        document.getElementById("q2_submit").disabled=false;

        document.getElementById("q3_question").style.display="block";
        document.getElementById("q3_a").disabled=false;
        document.getElementById("q3_b").disabled=false;
        document.getElementById("q3_submit").disabled=false;

        document.getElementById("q4_question").style.display="block";
        document.getElementById("q4_a").disabled=false;
        document.getElementById("q4_b").disabled=false;
        document.getElementById("q4_submit").disabled=false;

        document.getElementById("q5_question").style.display="block";
        document.getElementById("q5_a").disabled=false;
        document.getElementById("q5_b").disabled=false;
        document.getElementById("q5_submit").disabled=false;

        document.getElementById("q6_question").style.display="block";
        document.getElementById("q6_a").disabled=false;
        document.getElementById("q6_b").disabled=false;
        document.getElementById("q6_submit").disabled=false;

        document.getElementById("q7_question").style.display="block";
        document.getElementById("q7_a").disabled=false;
        document.getElementById("q7_b").disabled=false;
        document.getElementById("q7_submit").disabled=false;

        document.getElementById("q8_question").style.display="block";
        document.getElementById("q8_a").disabled=false;
        document.getElementById("q8_b").disabled=false;
        document.getElementById("q8_submit").disabled=false;

        document.getElementById("q9_question").style.display="block";
        document.getElementById("q9_a").disabled=false;
        document.getElementById("q9_b").disabled=false;
        document.getElementById("q9_submit").disabled=false;

        document.getElementById("q10_question").style.display="block";
        document.getElementById("q10_a").disabled=false;
        document.getElementById("q10_b").disabled=false;
        document.getElementById("q10_submit").disabled=false;

        document.getElementById("q11_question").style.display="block";
        document.getElementById("q11_a").disabled=false;
        document.getElementById("q11_b").disabled=false;
        document.getElementById("q11_submit").disabled=false;

        document.getElementById("q12_question").style.display="block";
        document.getElementById("q12_a").disabled=false;
        document.getElementById("q12_b").disabled=false;
        document.getElementById("q12_submit").disabled=false;

        document.getElementById("q13_question").style.display="block";
        document.getElementById("q13_a").disabled=false;
        document.getElementById("q13_b").disabled=false;
        document.getElementById("q13_submit").disabled=false;
    }
    //update to finish
    else{
        //disable the finish button, emphasize the final score, deemphasize the other scoreboard items
        document.getElementById("finish").disabled=true;
        document.getElementById("finalscore").style.fontWeight="bolder";
        document.getElementById("rawscore").style.fontWeight="lighter";
        document.getElementById("correct").style.fontWeight="lighter";
        document.getElementById("triesleft").style.fontWeight="lighter";
        document.getElementById("time").style.fontWeight="lighter";

        //display the answers and disable the interval fields and submit buttons
        document.getElementById("q1_answer").style.display="block"//finish
        document.getElementById("q1_a").disabled=true;
        document.getElementById("q1_b").disabled=true;
        document.getElementById("q1_submit").disabled=true;

        document.getElementById("q2_answer").style.display="block"//finish
        document.getElementById("q2_a").disabled=true;
        document.getElementById("q2_b").disabled=true;
        document.getElementById("q2_submit").disabled=true;

        document.getElementById("q3_answer").style.display="block"//finish
        document.getElementById("q3_a").disabled=true;
        document.getElementById("q3_b").disabled=true;
        document.getElementById("q3_submit").disabled=true;

        document.getElementById("q4_answer").style.display="block"//finish
        document.getElementById("q4_a").disabled=true;
        document.getElementById("q4_b").disabled=true;
        document.getElementById("q4_submit").disabled=true;

        document.getElementById("q5_answer").style.display="block"//finish
        document.getElementById("q5_a").disabled=true;
        document.getElementById("q5_b").disabled=true;
        document.getElementById("q5_submit").disabled=true;

        document.getElementById("q6_answer").style.display="block"//finish
        document.getElementById("q6_a").disabled=true;
        document.getElementById("q6_b").disabled=true;
        document.getElementById("q6_submit").disabled=true;

        document.getElementById("q7_answer").style.display="block"//finish
        document.getElementById("q7_a").disabled=true;
        document.getElementById("q7_b").disabled=true;
        document.getElementById("q7_submit").disabled=true;

        document.getElementById("q8_answer").style.display="block"//finish
        document.getElementById("q8_a").disabled=true;
        document.getElementById("q8_b").disabled=true;
        document.getElementById("q8_submit").disabled=true;

        document.getElementById("q9_answer").style.display="block"//finish
        document.getElementById("q9_a").disabled=true;
        document.getElementById("q9_b").disabled=true;
        document.getElementById("q9_submit").disabled=true;

        document.getElementById("q10_answer").style.display="block"//finish
        document.getElementById("q10_a").disabled=true;
        document.getElementById("q10_b").disabled=true;
        document.getElementById("q10_submit").disabled=true;

        document.getElementById("q11_answer").style.display="block"//finish
        document.getElementById("q11_a").disabled=true;
        document.getElementById("q11_b").disabled=true;
        document.getElementById("q11_submit").disabled=true;

        document.getElementById("q12_answer").style.display="block"//finish
        document.getElementById("q12_a").disabled=true;
        document.getElementById("q12_b").disabled=true;
        document.getElementById("q12_submit").disabled=true;

        document.getElementById("q13_answer").style.display="block"//finish
        document.getElementById("q13_a").disabled=true;
        document.getElementById("q13_b").disabled=true;
        document.getElementById("q13_submit").disabled=true;
    }
}

function timer(state){
    //start timer 
    if (state){
        let start = new Date();
        start=start.getTime();
        //set end time
        var end= start+(state*60*1000+1000);
        //loop the time display every second
        displayTimeRemaining = setInterval(function(){
            var now = new Date().getTime();
            timeLeft = end - now;
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            if (minutes<10){
                minutes="0"+minutes;
            }
            if (seconds<10){
                seconds="0"+seconds;
            }
            document.getElementById("time").innerHTML="Time: " + minutes + ":" + seconds; 
            if (timeLeft<1000){ 
                finish();
                return;
            }
            
        },1000);      
    }
    //stop timer 
    else{
        clearInterval(displayTimeRemaining);
    }
}

function start(){
    //enable inputs and buttons
    updateDisplay(true);
    //start the timer
    timer(30);
}

function finish(){
    //disable inputs and buttons
    updateDisplay(false);
    //stop the timer
    timer(0);
}

function submit(n){

}


