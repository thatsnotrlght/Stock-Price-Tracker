// Retrieves JSON String containing users 'tickers' from browsers localStorage and parses JSON String and converts to JavaScript object (array in this case)
var tickers = JSON.parse(localStorage.getItem('tickers')) || [];
var lastPrices = {};
var counter = 10;


function startUpdateCycle() {
    updatePrices();
    var countdown = setInterval(function() {
        counter--;
        $('#counter').text(counter);
        if (counter <= 0) {
            updatePrices();
            counter = 15;
        }
    }, 1000)
}

$(document).ready(function () {

    tickers.forEach(function(ticker) {
        addTickerToGrid();
    });

    updatePrices();

    $('#add-ticker-form').submit(function(e) {
        e.preventDefault();
        var newTicker = $('#new-ticker').val().toUpperCase();
        if (!ticker.includes(newTicker)) {
            tickers.push(newTicker);
            localStorage.setItem('tickers', JSON.stringify(tickers))
            addTickerToGrid(newTicker);
        }
        $('new-ticker').val('');
        updatePrices();
    });

    $('#tickers-grid').on('click', '.remove-btn', function () {
        var tickerToRemove = $(this).data('ticker');
        tickers = tickers.filter(t => t !== tickerToRemove);
        localStorage.setItem('tickers', JSON.stringify(tickers))
        $(`#${tickerToRemove}`).remove()
    });

    startUpdateCycle();
});

function addTickerToGrid(ticker) {
    $('#ticker-grid').append(`<div id = "${ticker}" class="stock-box">
    <h2>${ticker}</h2>
    <p id="${ticker}-price"></p>
    <p id = "${ticker}-pct"></p>
    <button class = "remove-btn" data-ticker="${ticker}">Remove</button>
    </div>`)
}