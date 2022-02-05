$(document).ready(function () {
  console.log("composer-char-counter: ready");
});

  $("#tweet-text").on("keyup", function (e) {
    let typedText = $(this).val().length;
    let maxChar = 140;
    let remainingChars = maxChar - typedText;

    let count = $(this).parent().children("div").children(".counter");
    count.text(remainingChars);

    if (remainingChars < 0) {
      count.addClass("red");
    } else {
      count.removeClass("red");
    }
  });

