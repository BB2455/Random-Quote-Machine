let QUOTES_DATA = [];
const QUOTES_API = "https://type.fit/api/quotes";

const getQuotesData = async () => {
  // Quotes API from https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373
  $.ajax({
    url: QUOTES_API,
    success: (data) => {
      QUOTES_DATA = JSON.parse(data);
    },
    error: () => {
      QUOTES_DATA = [
        {
          text: "Error Getting API Data, Please Try Again Later",
          author: "Error",
        },
      ];
    },
  }).done(() => {
    getQuote();
  });
};

const setupSocials = (quote, author) => {
  // Twitter
  $("#tweet-quote").attr(
    "href",
    encodeURI(`https://twitter.com/intent/tweet?text="${quote}" ${author}`)
  );
};

// Will return random quote entry as {text: 'quote', author: 'author'}
const getRandomQuote = () => {
  return QUOTES_DATA[Math.floor(Math.random() * QUOTES_DATA.length)];
};

// Check to see if the function was called and is running before moving
// on, getting a new quote and animating the new quote to the screen.
let isAnimating = false;
const getQuote = () => {
  if (isAnimating == true) {
    return;
  }
  isAnimating = true;
  let quote = getRandomQuote();
  $("#text").animate({ opacity: 0 }, 250, function () {
    $(this).animate({ opacity: 1 }, 250);
    $(this).html(quote.text);
    setupSocials(quote.text, quote.author); // Will setup new social href once the quote changes.
  });
  $("#author").animate({ opacity: 0 }, 250, function () {
    $(this).animate({ opacity: 1 }, 250, function () {
      // Will run after finishing animating new quote to screen.
      isAnimating = false;
    });
    // Check to see if there is a author if not will say anonymous.
    if (!quote.author) {
      $(this).html("-Anonymous");
    } else {
      $(this).html("-" + quote.author);
    }
  });
};

$(function () {
  getQuotesData(); // Will get quotes data from api link then set the quote text with getQuote function.
  // Setup click event listener.
  $("#new-quote").click(() => {
    getQuote();
  });
});
