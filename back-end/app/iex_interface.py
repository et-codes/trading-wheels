import pyEX
from app.base_api_interface import BaseAPIInterface


class IEXInterface(BaseAPIInterface):

    def __init__(self):
        self.api = pyEX.Client(version="stable")
        self.quote_filter = "symbol,companyName,latestPrice,primaryExchange"
        self.company_filter = "CEO,city,state,country,description"
        self.chart_filter = "date,volume,close"
        self.symbol_filter = "symbol,name"

    def quote(self, symbol: str):
        try:
            quote = self.api.quote(symbol, filter=self.quote_filter)
            company_data = self.api.company(symbol, filter=self.company_filter)
            chart = self.api.chart(
                symbol, timeframe="3m", sort="asc", filter=self.chart_filter)
        except pyEX.common.exception.PyEXception:
            return f'Symbol "{symbol}" not found.', 404

        return {"quote": quote, "company": company_data, "chart": chart}

    def batch_quote(self, symbols: list[str]):
        try:
            batch = self.api.batch(symbols, fields="quote", filter=self.quote_filter)
        except:
            return f'Error retreiving batch data.', 500
        flat_batch = {}
        for symbol in symbols:
            flat_batch[symbol] = batch[symbol]['quote']
        return flat_batch

    def get_symbols(self):
        try:
            return self.api.symbols(filter=self.symbol_filter)
        except pyEX.common.exception.PyEXception:
            return f"Error retreiving symbols.", 500
