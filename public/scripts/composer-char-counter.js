$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let charLimit = 140;
    let len = $(this).val().length;
    let charRemaining = charLimit - len;

    $(".counter").text(charRemaining);

    if (charRemaining < 0) {
      $(".counter").addClass("exceed-limit");
    } else {
      $(".counter").removeClass("exceed-limit");
    }
  });
});


