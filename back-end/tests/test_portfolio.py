import json
import os
import requests
import unittest
from dotenv import load_dotenv


load_dotenv()
SERVER_URL = os.environ.get('SERVER_URL')
TEST_USERNAME = os.environ.get('TEST_USERNAME')
TEST_PASSWORD = os.environ.get('TEST_PASSWORD')


class PortfolioTests(unittest.TestCase):

    def setUp(self):
        self._test_user = {
            'username': TEST_USERNAME,
            'password': TEST_PASSWORD
        }

        url = f'{SERVER_URL}/user/{TEST_USERNAME}'
        response = requests.get(url)
        if response.text != TEST_USERNAME:
            url = f'{SERVER_URL}/user'
            requests.post(url, json=self._test_user)
        
        self.header = self.get_auth_header()

    def tearDown(self):
        url = f'{SERVER_URL}/user/logout/{TEST_USERNAME}'
        requests.get(url, headers=self.header)

    def get_auth_header(self):
        url = f'{SERVER_URL}/user/login'
        response = requests.post(url, json=self._test_user)
        token = response.text
        header = {'Authorization': f'Bearer {token}'}
        return header

    def test_receive_portfolio(self):
        temp_user = {'username': 'temporary_user_1854', 'password': '9as8hfgiodu'}
        self.create_trades(temp_user)
        url = f'{SERVER_URL}/portfolio/{temp_user["username"]}'
        response = requests.post(url)

        self.assertEqual(response.status_code, 200)
    
    def create_trades(self, temp_user):
        header = self.create_user_and_login(temp_user)

    def create_user_and_login(self, temp_user):
        requests.post(f'{SERVER_URL}/user', json=temp_user)
        response = requests.post(f'{SERVER_URL}/user/login', json=temp_user)
        token = response.text
        header = {'Authorization': f'Bearer {token}'}
        return header