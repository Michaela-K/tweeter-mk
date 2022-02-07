$(document).ready(function () {
  console.log("composer-char-counter: ready");
});

$(() => {
  function set(){
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
  }
    $("#tweet-text").keyup(set);

});

$(() => {
  function reloadChar(){
    let maxChar = 140;
    $("output.counter").text(maxChar);
    console.log("submit button clicked")
  }
  $(".submit").click(reloadChar);
});
