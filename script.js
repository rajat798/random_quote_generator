const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//show new quote

function newQuote() {
    showLoadingSpinner();
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    //check if author field is blank and replace it with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // SET QUOTE,HIDE LOADER
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
};



// GET QUOTES FROM API

async function getQuotes() {
    showLoadingSpinner();
    // const proxyUrl = 'https://mighty-fortress-83622.herokuapp.com/'
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();
    } catch(error) {
        //catch error here
        getQuotes();
        // console.log('Whoops,NO QUOTE!',error);
    }
}


//TWEET QUOTE
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
};

//Event Listeners

newQuoteBtn.addEventListener('click',getQuotes);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuotes();
// loading();
