$(document).ready(function(){

  var countDownTimer;

  $('.add').click(function() {
    AddToCounters('#'+ $(this).val(), '+');
  });

  $('.subtract').click(function() {
    AddToCounters('#'+ $(this).val(), '-');
  });

  $('#go').click(function() {
    if($(this).html() == 'GO') {
      changeTitle();
      setTimer();
      countDownTimer = setInterval(function(){
        var timeleft = calculateCount($('#timer').html());
        if(timeleft <= 0) {
          clearInterval(countDownTimer);
          $('#timerTitle').html('Break');
          changeTitle();
          setTimer();
          $('#go').html('GO');
        }
      },1000);
    } else {
      clearInterval(countDownTimer);
      $('#timer').html($('#work').html());
    }
    RunTimer('#go');
  });

  function setTimer() {
    if($('#timerTitle').html() == 'Work') {
      $('#timer').html($('#work').html());
    } else if($('#timerTitle').html() == 'Break') {
      $('#timer').html($('#break').html());
    }
  }

  function changeTitle() {
    if($('#timerTitle').html() === 'Break' || $('#timerTitle').html() === '') {
      $('#timerTitle').html('Work');
    } else if($('#timerTitle').html() === 'Work'){
      $('#timerTitle').html('Break');
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
    if(parseFloat($(element).html()) > 1 || operator === '+') {
      if(operator === '+') {
        $(element).html((parseFloat($(element).html()) + 1).toFixed(2));
      } else if(operator === '-') {
        $(element).html((parseFloat($(element).html()) - 1).toFixed(2));
      }
    }
  }

});
