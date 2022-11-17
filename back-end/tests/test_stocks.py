import os
import requests
import unittest
from dotenv import load_dotenv


load_dotenv()
SERVER_URL = os.environ.get('SERVER_URL')
TEST_USERNAME = os.environ.get('TEST_USERNAME')
TEST_PASSWORD = os.environ.get('TEST_PASSWORD')


class StockTests(unittest.TestCase):

    def setUp(self) -> None:
        self._test_user = {
            'username': TEST_USERNAME,
            'password': TEST_PASSWORD
        }

        url = f'{SERVER_URL}/user/{TEST_USERNAME}'
        response = requests.get(url)
        if response.text != TEST_USERNAME:
            url = f'{SERVER_URL}/user'
            requests.post(url, json=self._test_user)
        
        self.header = self.login_get_auth_header()
        return super().setUp()

    def tearDown(self) -> None:
        url = f'{SERVER_URL}/user/logout/{TEST_USERNAME}'
        requests.get(url, headers=self.header)
        return super().tearDown()
    
    def login_get_auth_header(self):
        url = f'{SERVER_URL}/user/login'
        response = requests.post(url, json=self._test_user)
        token = response.text
        header = {'Authorization': f'Bearer {token}'}
        return header
    
    def test_get_stock_data(self):
        url = f'{SERVER_URL}/stock/quote/AAPL'
        response = requests.get(url, headers=self.header)
        self.assertEqual(response.status_code, 200)
        
        stock = response.json()
        self.assertEqual(stock['symbol'], 'AAPL')

    def test_bad_symbol_returns_404(self):
        url = f'{SERVER_URL}/stock/quote/ZZZZZZZZZZ'
        response = requests.get(url, headers=self.header)
        self.assertEqual(response.status_code, 404)

    def test_search_stock_symbols(self):
        url = f'{SERVER_URL}/stock/search/apple'
        response = requests.get(url, headers=self.header)
        self.assertEqual(response.status_code, 200)

        stocks = response.json()
        symbols = map(lambda s: s['symbol'], stocks)
        self.assertIn('AAPL', symbols)

    def test_no_search_result_returns_empty_list(self):
        url = f'{SERVER_URL}/stock/search/ZZZZZZZZZZ'
        response = requests.get(url, headers=self.header)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)


if __name__ == '__main__':
    unittest.main()
