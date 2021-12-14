var quotesData;
var currentQuote = '',
    currentAuthor = '';

var colors = ['#f64040',
              '#d065d9',
              '#6665d9',
              '#65c5d9',
              '#6ed965',
              '#cdd965',
              '#d98765'];

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url:
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        currentQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)].quote;
        currentAuthor = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)].author;
      }
    }
  });
}

function makeQuote() {
  let randomColor = 
      colors[Math.floor(Math.random() * (colors.length - 1))];
  
  getQuotes();
  
  $("html body").css({
    "background-color": randomColor,
    "color": randomColor
  });
  $("#text").html("<stron>\"</strong>" + currentQuote + ".<stron>\"</strong>");
  $('#author').html("<em> - " + currentAuthor + "</em>")
  $("#new-quote").css({
    "background-color": randomColor,
    "border": "none"
  });
  $("#tweet-quote").css("background-color", randomColor);
}

$(document).ready(getQuotes().then(() => makeQuote()));
