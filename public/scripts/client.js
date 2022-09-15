/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



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
  <p class="tweet-text">${tweetObj.content.text}</p>
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
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = () => {
    $.get("/tweets", { method: "GET" })
      .then((data) => {
        renderTweets(data);
        //console.log("Success: ", renderTweets);
      });
  };
  
  $(document).ready(function() {
  // Attach a submit handler to the form
  $("form").submit(function(event) {

    // Stop form from submitting normally
    event.preventDefault();

    //Serialize data
    const tweetSerialized = $(this).serialize();

    //Validate the input
    const tweetMessage = $(this).find("#tweet-text").val().length;
    if (!tweetMessage) {
      return alert("This field is empty! Please add your Tweet");
    }
    if (tweetMessage > 140) {
      return alert("You exceeded our limit of 140 characters!");
    }

    // Send the data using post
    $.post("/tweets", tweetSerialized).then(loadTweets);
    
  });

  
  loadTweets();
});

