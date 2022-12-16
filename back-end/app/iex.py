import pyEX

api = pyEX.Client(version='stable')

def quote(symbol: str):
    quote_filter = 'symbol,companyName,latestPrice,primaryExchange'
    company_filter = 'CEO,city,state,country,description'
    chart_filter = 'date,volume,close'

    try:
        quote = api.quote(symbol, filter=quote_filter)
        company_data = api.company(symbol, filter=company_filter)
        chart = api.chart(symbol, timeframe='3m', sort="asc", filter=chart_filter)
    except pyEX.common.exception.PyEXception:
        return f'Symbol "{symbol}" not found.', 404

    return {
        'quote': quote,
        'company': company_data,
        'chart': chart
    }

def get_symbols():
    try:
        return api.symbols(filter='symbol,name')
    except pyEX.common.exception.PyEXception:
        return f'Error retreiving symbols.', 500