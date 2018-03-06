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
  });

  $('#go').click(function() {
    if($(this).html() == 'GO') {
      if($('#timerTitle').html() == 'Lets Do Some Work') {
        $('#timerTitle').html('Work');
        $('#timer').html($('#work').html());
      }
      countDownTimer = setInterval(function(){
        var timeleft = calculateCount($('#timer').html());
        //var percentageDecrease = timeleft / 
        $("#progress_bar").animate({height: "100%"});
        if(timeleft <= 0) {
          clearInterval(countDownTimer);
          setTimerAndTitle();
          $('#go').html('GO');
        }
      },1000);
    } else {
      clearInterval(countDownTimer);
      //$('#timer').html($('#work').html());
    }
    RunTimer('#go');
  });

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
