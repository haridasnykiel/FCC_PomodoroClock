$(document).ready(function(){
  var workTime;
  var breakTime;
  setWorkTimer($('#work').html());

  function setWorkTimer(timeInMins) {
    $('#timer').text(timeInMins);
  }

  $('.add').click(function() {
    AddToCounters('#'+ $(this).val(), '+');
    AddTime($(this).val());
  });

  $('.subtract').click(function() {
    AddToCounters('#'+ $(this).val(), '-');
    AddTime($(this).val());
  });

  $('#go').click(function() {
    var timeleft = $('#timer').html();;
    var downloadTimer = setInterval(function(){
    timeleft = parseFloat(timeleft) - 0.01;
    $('#timer').html(timeleft);
    if(timeleft <= 0)
        clearInterval(downloadTimer);
    },1000);
  });

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
      setWorkTimer(workTime);
    } else if(timeType === 'break') {
      breakTime = parseFloat($('#break').html()).toFixed(2);
    }
    console.log(workTime);
    console.log(breakTime);
  }



});
