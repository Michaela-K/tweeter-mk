/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  console.log("client.js : ready");

  // jQuery("time.timeago").timeago();

  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: (datetime = "2008-07-17T09:24:17Z"),
  };

  //to prevent application vulnerability
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //This function shouldn't insert the created DOM structure to the page.
  //It should instead just return the $tweet to the caller
  //takes in tweet object & returns tweet article
  function createTweetElement(tweetData) {
    //should this be tweetform?
    let $newTweet = $(`
  <section class="tweetsContainer">
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
      </section>
      `);

    return $newTweet;
  }

  const renderTweets = function (tweets) {
    // loops through array of tweet objects
    for (const tweet in tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweets[tweet]);
      // takes return value and appends it to the tweets container
      $(".tweetsContainer").prepend($tweet);
    }
  };

  //error messages
  // const errorFunction = function(){
  //   $("form").error(function(){
  //     $("h2").replacewith("<h2>Error </h2>");
  //   })
  // }

  //error
  // $(".errMsg").slideup(400).text('');

  //create an AJAX POST request in client.js that sends the form data to the server.
  //form submission
  let $form = $(".tweetForm");
  $form.on("submit", function (event) {
    event.preventDefault(); //page wont refresh
    console.log("Button clicked");


    //validation
    //empty
    if ($form.children("textarea").val() === "") {
      alert("Tweet field cannot be empty");
      // return $(".errMsg").text("Tweet field cannot be empty").slideDown();
    }
    //too long
    if ($form.children("textarea").val().length > 140) {
      alert("character limit exceeded");
    }

    //submit tweet to database
    let $formData = $form.serialize();
    $.ajax({
      url: "/tweets", //is this right?
      type: "POST",
      data: $formData, //The serialize() method creates a URL encoded text string by serializing form values.
    })
      .then(function (tweets) {
        console.log("success: ", tweets);
        loadTweets(tweets); //dynamically load
      })
      .catch((err) => {
        console.log(" formData Error: ", err);
      });
  });

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }) //is this right?
      .then(function (tweets) {
        console.log("getting tweets from db");
        renderTweets(tweets); //You already have a renderTweets function defined which can take in this array of objects and render them to the DOM, so your success callback function will simply call up renderTweets, passing it the response from the AJAX request.
      })
      .catch((err) => {
        console.log("loadTweets Error: ", err);
      });
  }
});
