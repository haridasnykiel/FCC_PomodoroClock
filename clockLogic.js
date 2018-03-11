$(document).ready(function(){

  var countDownTimer;

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
    $("#progress_bar").animate({width: "100%"});
  });

  $('#go').click(function() {
    if($(this).html() == 'GO') {
      if($('#timerTitle').html() == 'Lets Do Some Work') {
        $('#timerTitle').html('Work');
        $('#timer').html($('#work').html());
      }
      var totalTime = parseFloat($('#work').html());
      var totalTimeInSeconds = totalTime * 60;
      var remainingTimeInSeconds = totalTimeInSeconds;
      countDownTimer = setInterval(function(){
        var timeleft = parseFloat(calculateCount($('#timer').html()));
        remainingTimeInSeconds -= 1;
        var getPercentage = calculatePercentageForProgressBar(totalTimeInSeconds, remainingTimeInSeconds);
        $("#progress_bar").animate({width: String(getPercentage) + "%"});
        if(timeleft <= 0) {
          clearInterval(countDownTimer);
          setTimerAndTitle();
          $('#go').html('GO');
          $("#progress_bar").animate({width: "100%"});
        }
      },1000);
    } else {
      clearInterval(countDownTimer);
    }
    RunTimer('#go');
  });

  function calculatePercentageForProgressBar(totalTimeInSecs, remainingTimeInSecs) {
    var decrease = totalTimeInSecs-remainingTimeInSecs;
    return 100-(decrease/totalTimeInSecs*100);
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
