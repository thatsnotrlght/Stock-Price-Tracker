# Backend to communicate with yahoo finance api to get stock price information
import yfinance as yf
from flask import request, render_template, jsonify, Flask

# Instance of Flask class
app = Flask(__name__, template_folder = 'templates')

# Handles GET requests to root URL
@app.route('/')
def index():
    return render_template('index.html')

# Handles POST requests to receive data; Gets JSON data in key 'ticker' representing stock symbol
@app.route('/get_stock_data', methods=['POST'])
def get_stock_data():
    ticker = request.get_json()['ticker']
    data = yf.Ticker(ticker).history(period='1y')
    return jsonify({'currentPrice': data.iloc[-1].Close, # Current price of most recent [-1]
                    'openPrice': data.iloc[-1].Open}) # Open price of most recent [-1]

if __name__ == '__main__':
    app.run(debug=True)