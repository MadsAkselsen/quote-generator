const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quote From API
let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else authorText.textContent = quote.author;

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
    quoteText.textContent = quote.text;
  } else quoteText.textContent = quote.text;

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  // proxy is used to avoid a CORS error
  const proxyUrl = "https://whispering-reef-88562.herokuapp.com/";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    loading();
    const response = await fetch(proxyUrl + apiUrl);
    apiQuotes = await response.json();
    complete();
    newQuote();
  } catch (error) {
    console.log("whoops, no quote:", error);
  }
}

// More more info google "twitter web intent"
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listerners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On Load
getQuotes();
