$(document).ready(function(){

  var countDownTimer;

  $('#timer').html($('#work').html());

  $('.add').click(function() {
    AddToCounters('#'+ $(this).val(), '+');
    AddTime($(this).val());
  });

  $('.subtract').click(function() {
    AddToCounters('#'+ $(this).val(), '-');
    AddTime($(this).val());
  });

  $('#go').click(function() {
    if($(this).html() == 'GO') {
      countDownTimer = setInterval(function(){
        var timeleft = calculateCount($('#timer').html());
        if(timeleft <= 0) {
          clearInterval(countDownTimer);
          setTimerNumber();
          $(this).html('GO');
        }
      },1000);
    } else {
      clearInterval(countDownTimer);
      $('#timer').html($('#work').html());
    }
    RunTimer('#go');
  });

  function setTimerNumber() {
    if($('#timerTitle').html() == 'Work') {
      $('#timer').html($('#break').html());
      $('#timerTitle').html('Break');
    } else {
      $('#timer').html($('#work').html());
      $('#timerTitle').html('Work');
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
      $(element).html('STOP');
    } else if($(element).html() == 'STOP') {
      $(element).html('GO');
    }
  }

  function AddToCounters(element, operator) {
    if(parseFloat($(element).html()) > 0 || operator === '+') {
      if(operator === '+') {
        $(element).html((parseFloat($(element).html()) + 1).toFixed(2));
      } else if(operator === '-') {
        $(element).html((parseFloat($(element).html()) - 1).toFixed(2));
      }
    }
  }

  function AddTime(timerType) {
    if(timerType === 'work') {
      workTime = parseFloat($('#work').html()).toFixed(2);
      $('#timer').html(workTime);
    } else if(timerType === 'break') {
      breakTime = parseFloat($('#break').html()).toFixed(2);
    }
  }

});
