/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  // Attach a submit handler to the form
  $("form").on('submit', function(event) {

    // Stop form from submitting normally
    event.preventDefault();

    //Serialize data
    const tweetSerialized = $(this).serialize();

    //Validate the input
    const tweetLength = $(this).find("#tweet-text").val().length;
    if (!tweetLength) {
      $(".tweet-message-error").text("🙊 This field is empty! Please add your Tweet!").slideDown();
    }
    if (tweetLength > 140) {
      return $(".tweet-message-error").text("🙊 You exceeded our limit of 140 characters!").slideDown();
    }

    // Send the data using post
    $.post("/tweets", tweetSerialized).then(loadTweets);
    //Clear form
    $("form").trigger("reset");
    //Reset counter
    $('.counter').text('140');
  });

  $("form").on('click', function() {
    $(".tweet-message-error").hide();
  });
  loadTweets();

});

const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetObj) => {
  let $timestamp = timeago.format(tweetObj.created_at);
  let $tweet = $(` 
  <article class="tweets-container">
  <header class="tweets-container-header">
    <div class="tweets-container-user-info">
      <img
        class="header-img"
        src=${tweetObj.user.avatars}
        alt="avatar image"
      />
      <span class="header-username" >${tweetObj.user.name}</span>
    </div>
    <div class="tweets-container-handle">${tweetObj.user.handle}</div>
  </header>
  <p class="tweet-text">${escapeText(tweetObj.content.text)}</p>
  <footer class="footer">
    <span class="footer-timestamp">${$timestamp}</span>
    <span class="footer-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </span>
  </footer>
</article>`);

  return $tweet;
};

const renderTweets = (tweets) => {

  $('#tweets-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

const loadTweets = () => {
  $.get("/tweets")
    .then((data) => {
      renderTweets(data);
      //console.log("Success: ", renderTweets);
    });
};


