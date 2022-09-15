/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];
$(document).ready(function() {

  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }

  };

  const createTweetElement = (tweetObj) => {
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
    <span class="footer-timestamp">${tweetObj.created_at}</span>
    <span class="footer-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </span>
  </footer>
</article>`);

    return $tweet;
  };

const loadTweets = ()=>{
  $.get("/tweets",{method:"GET"})
  .then((data) => {
    renderTweets(data);
    //console.log("Success: ", renderTweets);
  })
    
}

loadTweets()


});
// Attach a submit handler to the form
$("form").submit(function(event) {

  // Stop form from submitting normally
  event.preventDefault();

  //Serialize data
  const tweetSerialized = $(this).serialize();
  console.log(tweetSerialized);
  // Send the data using post
  $.post("/tweets", tweetSerialized);

});
