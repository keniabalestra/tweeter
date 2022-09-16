$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    let charLimit = 140;
    let charRemaining = charLimit - $(this).val().length;
    $(".counter").text(charRemaining);

    if (charRemaining < 0) {
      $(".counter").addClass("exceed-limit");
    } else {
      $(".counter").removeClass("exceed-limit");
    }
  });
});


