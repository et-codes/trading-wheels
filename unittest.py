import json
import os
import requests
import unittest
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
TEST_USERNAME = os.environ.get('TEST_USERNAME')
TEST_PASSWORD = os.environ.get('TEST_PASSWORD')

class TestLogin(unittest.TestCase):

    def setUp(self):
        self.login_url = 'http://localhost:5000/api/login'
        self.login_data = {
            'username': TEST_USERNAME,
            'password': TEST_PASSWORD
        }
    
    def tearDown(self):
        logout_url = 'http://localhost:5000/api/logout'
        logout_data = {'username': TEST_USERNAME}
        requests.post(logout_url, json=logout_data)

    def test_login_returns_token(self):
        response = requests.post(self.login_url, json=self.login_data)
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()