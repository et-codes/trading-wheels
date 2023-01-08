import os
import requests
from fmp_python.fmp import FMP
from dotenv import load_dotenv
from app.base_api_interface import BaseAPIInterface

load_dotenv()

class FMPInterface(BaseAPIInterface):
    def __init__(self):
        self.api_key = os.environ.get('FMP_API_KEY')
        self.api = FMP(api_key=self.api_key)
        self.company_url = 'https://financialmodelingprep.com/api/v3/profile'
        self.chart_url = 'https://financialmodelingprep.com/api/v3/historical-price-full'
        self.batch_url = 'https://financialmodelingprep.com/api/v3/quote'
        self.symbols_url = f'https://financialmodelingprep.com/api/v3/available-traded/list?apikey={self.api_key}'

    def quote(self, symbol: str):
        try:
            quote = self.api.get_quote(symbol)[0]
            resp = requests.get(
                f'{self.company_url}/{symbol}?apikey={self.api_key}')
            company = resp.json()[0]
            resp = requests.get(
                f'{self.chart_url}/{symbol}?timeseries=90&apikey={self.api_key}')
            chart = resp.json()
        except:
            return f'Symbol "{symbol}" not found.', 404
        
        return {
            "quote": self.filter_quote(quote),
            "company": self.filter_company(company),
            "chart": self.filter_chart(chart)
        }

    def filter_quote(self, quote: dict):
        return {
            "symbol": quote['symbol'],
            "companyName": quote['name'],
            "latestPrice": quote['price'],
            "primaryExchange": quote['exchange']
        }

    def filter_company(self, company: dict):
        return {
            "CEO": company['ceo'],
            "city": company['city'],
            "state": company['state'],
            "country": company['country'],
            "description": company['description']
        }
    
    def filter_chart(self, chart: dict):
        output = []
        for day in chart['historical']:
            output.append({
                "date": day['date'],
                "volume": day['volume'],
                "close": day['close']
            })
        return output

    def filter_symbols(self, symbols: list[dict]):
        output = []
        for symbol in symbols:
            output.append({
                "symbol": symbol['symbol'],
                "name": symbol['name']
            })
        return output

    def batch_quote(self, symbols: list[str]):
        symbols_string = ','.join(symbols)
        try:
            resp = requests.get(
                f'{self.batch_url}/{symbols_string}?apikey={self.api_key}')
        except:
            return f'Error retreiving batch data.', 500
        
        output = {}
        for quote in resp.json():
            output[quote['symbol']] = self.filter_quote(quote)
        return output

    def get_symbols(self):
        try:
            resp = requests.get(self.symbols_url)
        except:
            return f"Error retreiving symbols.", 500
        
        return self.filter_symbols(resp.json())


if __name__ == '__main__':
    api = FMPInterface()
    print(api.batch_quote(['AAPL', 'GOOG', 'GME', 'HELE']))
