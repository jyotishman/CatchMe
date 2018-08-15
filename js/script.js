$(document).ready(function() {
  generateScore();
  selectLevel();
});


var score = 0;
var size = 6;
var counter = 60;

function selectLevel() {
  $(document).on("click", ".level-wrapper p", function() {
    if ($(this).index() == 0) {
      generateBlock(4)
    } else if ($(this).index() == 1) {
      generateBlock(16)
    } else {
      generateBlock(24)
    }
    $('.score-wrapper').show();
  });
}

function generateBlock(size) {
  $('.game-wrapper').show();
  $('.level-wrapper').hide();
  for (i = 0; i < size; i++) {
    $('.game-wrapper').append('<div class="box"></div>');
  }
  setInterval(function() {
    generateRandomblock(size);
  }, 1000);
  x = setInterval(function() {
    setTimer();
  }, 1000);
}

function generateRandomblock(range) {
  $('.game-wrapper>div').removeClass('active')
  $('.game-wrapper>div').removeClass('active-select')
  var x = Math.floor((Math.random() * range) + 1);
  $('.game-wrapper>div:nth-child(' + x + ')').addClass('active')
}

function generateScore() {
  $(document).on("click", ".game-wrapper>div.box.active", function() {
    $(this).addClass('active-select')
    score = score + 1;
    $('.score').html(score)
  });
}

function setTimer() {
  counter--;
  $('.timer').html(counter);
  if (counter === 0) {
    clearInterval(x);
    showResults();
  }
}

function showResults() {
  $('.game-results').show();
  $('.overlay').show();
  $('.game-results').append(
    '<h1>Game Over</h1><p>Your score is ' + score + '</p><button class="try-again-btn">Try Again </button>'
  )
  if ('localStorage' in window && window.localStorage !== null ){
    if (localStorage.getItem('score')) {
      var oldScore = localStorage.getItem('score');
      if (score>oldScore) {
        localStorage.setItem('score', score);
      }
    }
    else{
      localStorage.setItem('score', score);
    }
  }
}

(function handleTryAgain() {
  $(document).on("click", ".try-again-btn", function() {
    location.reload();
  });
})();
(function showHighestScore() {
  if (localStorage.getItem('score')) {
    var oldScore = localStorage.getItem('score');
    $('.highest-score').html(oldScore)
  }
  else{
    $('.highest-score').html(score)
  }
})();