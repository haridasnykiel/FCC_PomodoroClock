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
    if($('#go').html() == 'GO') {
      countDownTimer = setInterval(function(){
        var timeleft = calculateCount($('#timer').html());
        if(timeleft <= 0) {
          clearInterval(countDownTimer);
        }
      },1000);
    } else {
      clearInterval(countDownTimer);
      $('#timer').html($('#work').html());
    }
    RunTimer('#go');
  });

  function calculateCount(totalTime) {
    var timeleft = totalTime;
    timeleft = (parseFloat(timeleft) - 0.01).toFixed(2);
    $('#timer').html(timeleft);
    return timeleft;
  }

  function RunTimer(elementName) {
    if($(elementName).html() == 'GO') {
      $(elementName).html('STOP');
    } else {
      $(elementName).html('GO');
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

  function AddTime( timeType) {
    if(timeType === 'work') {
      workTime = parseFloat($('#work').html()).toFixed(2);
      $('#timer').html(workTime);
    } else if(timeType === 'break') {
      breakTime = parseFloat($('#break').html()).toFixed(2);
    }
  }

});
