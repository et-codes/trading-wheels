import json
import os
import requests
import unittest
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
SERVER_URL = os.environ.get('SERVER_URL')
TEST_USERNAME = os.environ.get('TEST_USERNAME')
TEST_PASSWORD = os.environ.get('TEST_PASSWORD')


class TradeTests(unittest.TestCase):

    def setUp(self):
        # Login test user
        self._test_user = {
            'username': TEST_USERNAME,
            'password': TEST_PASSWORD
        }
        url = f'{SERVER_URL}/user/login'
        request = requests.post(url, json=self._test_user)
        self.token = request.text

    def tearDown(self):
        # Logout test user
        url = f'{SERVER_URL}/user/logout/{TEST_USERNAME}'
        requests.get(url)

    def test_get_portfolio(self):
        url = f'{SERVER_URL}/trade/{TEST_USERNAME}'
        response = requests.get(url)
        portfolio = json.loads(response.text)

        self.assertIsInstance(portfolio, list)
        self.assertGreaterEqual(len(portfolio), 1)
        self.assertGreaterEqual(portfolio[0]['shares'], 1)

    @unittest.skip('Not written yet.')
    def test_trade_buy(self):
        pass

    @unittest.skip('Not written yet.')
    def test_trade_sell(self):
        pass


if __name__ == '__main__':
    unittest.main()