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

const setupSocials = (quote, author) => {};

const getRandomQuote = () => {
  return QUOTES_DATA[Math.floor(Math.random() * QUOTES_DATA.length)];
};

const getQuote = () => {
  let quote = getRandomQuote();
  setupSocials(quote.text, quote.author);
  $("#text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $(this).html(quote.text);
  });
  $("#author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    if (!quote.author) {
      $(this).html("-Anonymous");
    } else {
      $(this).html("-" + quote.author);
    }
  });
};

const newQuote = () => {
  getQuote();
};

$(function () {
  getQuotesData(); // Will get quotes data from api link then set the quote text with getQuote function.
  $("#new-quote").click(newQuote);
});
