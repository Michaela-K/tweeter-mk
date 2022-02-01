$(document).ready(function() {
  console.log('ready')
});

$(document).ready(function() {
$('#tweet-text').on("keyup", function(e) {
  let typedText = $(this).val().length;
  let maxChar = 140
  let remainingChars = maxChar - typedText;
  // console.log(typedText);
  // console.log(remainingChars);

  let count = $(this).parent().children('div').children('.counter')
  // console.log(count);
  count.text(remainingChars);   //.text calls .createTextNode()

  if (remainingChars < 0) {
    count.addClass('red');
  } else {
    count.removeClass('red');
  }
});
});