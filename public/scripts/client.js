/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  console.log("client.js : ready");

  //no error
  $(".errors").slideUp(10).text("");

  //compose button - auto focus on textarea
  $(".button").on("click", function () {
    $("textarea").focus();
  });

  //to prevent application vulnerability
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
 
  const createTweetElement = (tweetData) => {
    let $newTweet = $(`
        <article class="tweet header">
          <div class="headerContainer">
            <div class="iconAndPara">
              <p class="pImg">
                <img class="user-img" src="${escape(
                  tweetData.user.avatars
                )}" aria-hidden="true"></img>
                ${escape(tweetData.user.name)}
              </p>
            </div>
            <p class="at">${escape(tweetData.user.handle)}</p>
          </div>
          <p class="quote">
          ${escape(tweetData.content.text)}
          </p>
          <footer class="footer">
            <div class="iconsAndDate">
              <time class ="timeago" datetime="2008-07-17T09:24:17Z">${escape(
                timeago.format(tweetData.created_at)
              )}</time>
              <div class="iconContainer">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
              </div>
            </div>
          </footer>
        </article>
      `);

    return $newTweet;
  };

  const renderTweets = function (tweets) {
    $(".tweetsContainer").html("");
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $(".tweetsContainer").prepend($tweet);
    }
  };

  //form submission
  let $form = $(".tweetForm");
  $form.on("submit", function (event) {
    event.preventDefault();
    console.log("Button clicked");

    //validation
    if ($form.children("textarea").val() === "") {
      return $(".errors").slideDown(400).text("Tweet field cannot be empty");
    }
    if ($form.children("textarea").val().length > 140) {
      return $(".errors").slideDown(400).text("Character limit exceeded");
    }

    //submit tweet to database
    let $formData = $form.serialize();
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: $formData,
    })
      .then(function (tweets) {
        loadTweets(tweets);
      })
      .catch((err) => {
        console.log(" formData Error: ", err);
      });
    if ($form.children("textarea").val().length > 0) {
      $("#tweet-text").val("");
    }
  });

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .then(function (tweets) {
        renderTweets(tweets); 
      })
      .catch((err) => {
        console.log("loadTweets Error: ", err);
      });
  };
  loadTweets();
});
