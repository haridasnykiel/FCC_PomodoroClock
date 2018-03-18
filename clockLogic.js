$(document).ready(function(){

  var countDownTimer;
  var colours = ["#870F77", "#8E5A87", "#56244F", "#DC98D3", "#9D53B7", "#D87DF9", "#5500ff", "#884dff",
  "#ff3377", "#ff99bb", "#b30000", "#ff9999"];
  var totalTime;
  var totalTimeInSeconds;
  var remainingTimeInSeconds;

  $('.add').click(function() {
    AddToCounters('#'+ $(this).val(), '+');
  });

  $('.subtract').click(function() {
    AddToCounters('#'+ $(this).val(), '-');
  });

  $('#reset').click(function(){
    $('#timerTitle').html('Lets Do Some Work');
    $('#timer').html('25.00');
    clearInterval(countDownTimer);
    ProgressBarAnimation("#B14CFE", "100", "0");
    $("#go").html('GO');
  });

  $('#go').click(function() {
    if($(this).html() == 'GO') {
      if($('#timerTitle').html() == 'Lets Do Some Work') {
        $('#timerTitle').html('Work');
        $('#timer').html($('#work').html());
      }

      if($("#progress_bar").css( "background-color" ) == "rgb(177, 76, 254)") {
        totalTime = parseFloat($('#work').html());
        totalTimeInSeconds = totalTime * 60;
        remainingTimeInSeconds = totalTimeInSeconds;
      }

      countDownTimer = setInterval(function(){
        var timeleft = parseFloat(calculateCount($('#timer').html()));
        remainingTimeInSeconds -= 1;
        var getPercentage = calculatePercentageForProgressBar(totalTimeInSeconds, remainingTimeInSeconds);
        ProgressBarAnimation(colours[Math.round(GetRandomArrValue(colours))],String(getPercentage),
        String(getPercentage));
        if(timeleft <= 0) {
          clearInterval(countDownTimer);
          setTimerAndTitle();
          $('#go').html('GO');
          ProgressBarAnimation("#B14CFE", "100", "0");
          if($('#timerTitle').html() == 'Break') {
            PlayAudio("./audio/martial arts1.wav");
          } else {
            PlayAudio("./audio/martial arts2.wav");
          }

        }
      },1000);
    } else {
      clearInterval(countDownTimer);
    }
    RunTimer('#go');
  });

  function PlayAudio(audioFilePath) {
    var audio = new Audio(audioFilePath);
    audio.play();
  }

  function GetRandomArrValue(arr) {
    return Math.random() * (arr.length - 0) + 0;
  }

  function calculatePercentageForProgressBar(totalTimeInSecs, remainingTimeInSecs) {
    var decrease = totalTimeInSecs-remainingTimeInSecs;
    return 100-(decrease/totalTimeInSecs*100);
  }

  function ProgressBarAnimation(backgroundColor, width, borderRadius) {
    $("#progress_bar").animate({
      backgroundColor: backgroundColor,
      width: width + "%",
      borderRadius: borderRadius + "%"
    });
  }

  function setTimerAndTitle() {
    if($('#timerTitle').html() == 'Break') {
      $('#timerTitle').html('Work');
      $('#timer').html($('#work').html());
    } else if($('#timerTitle').html() == 'Work') {
      $('#timerTitle').html('Break');
      $('#timer').html($('#break').html());
    }
  }

  function calculateCount(totalTime) {
    var timeleft = totalTime;
    var regex = /\d+\.00/g;
    if(timeleft.match(regex)) {
      timeleft = (parseFloat(timeleft) - 0.41).toFixed(2);
    } else {
      timeleft = (parseFloat(timeleft) - 0.01).toFixed(2);
    }
    $('#timer').html(timeleft);
    return timeleft;
  }

  function RunTimer(element) {
    if($(element).html() == 'GO') {
      $(element).html('PAUSE');
    } else {
      $(element).html('GO');
    }
  }

  function AddToCounters(element, operator) {
    if(parseFloat($(element).html()) > 1 || operator === '+') {
      if(operator === '+') {
        $(element).html((parseFloat($(element).html()) + 1).toFixed(2));
      } else if(operator === '-') {
        $(element).html((parseFloat($(element).html()) - 1).toFixed(2));
      }
    }
  }

});
