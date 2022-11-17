import os
import requests
import unittest
from dotenv import load_dotenv


load_dotenv()
SERVER_URL = os.environ.get('SERVER_URL')


class PortfolioTests(unittest.TestCase):

    def setUp(self) -> None:
        self._test_user = {
            'username': 'temporary_user_1854',
            'password': '9as8hfgiodu'
        }

        self.create_test_user()        
        self.header = self.login_get_auth_header()
        self.create_trades()

    def tearDown(self) -> None:
        url = f'{SERVER_URL}/user/logout/{self._test_user["username"]}'
        requests.get(url, headers=self.header)

        url = f'{SERVER_URL}/user'
        requests.delete(url, json=self._test_user)

    def create_test_user(self) -> None:
        url = f'{SERVER_URL}/user/{self._test_user["username"]}'
        response = requests.get(url)
        if response.text != self._test_user["username"]:
            url = f'{SERVER_URL}/user'
            requests.post(url, json=self._test_user)

    def login_get_auth_header(self) -> dict:
        url = f'{SERVER_URL}/user/login'
        response = requests.post(url, json=self._test_user)
        token = response.text
        header = {'Authorization': f'Bearer {token}'}
        return header

    def create_trades(self) -> None:
        url = f'{SERVER_URL}/trade'
        trade_obj = {
            'username': self._test_user["username"],
            'symbol': 'IBM',
            'shares': 100,
            'price': 10
        }
        
        requests.post(url, json=trade_obj, headers=self.header)
        requests.post(url, json=trade_obj, headers=self.header)

    def test_receive_portfolio(self) -> None:
        url = f'{SERVER_URL}/portfolio/{self._test_user["username"]}'
        response = requests.get(url, headers=self.header)

        self.assertEqual(response.status_code, 200)

        portfolio = response.json()
        self.assertEqual(portfolio['summary']['cash'], 98000)
        self.assertEqual(len(portfolio['positions']), 2)


if __name__ == '__main__':
    unittest.main()