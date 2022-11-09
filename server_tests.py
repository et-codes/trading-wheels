import os
import requests
import unittest
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
SERVER_URL = os.environ.get('SERVER_URL')
TEST_USERNAME = os.environ.get('TEST_USERNAME')
TEST_PASSWORD = os.environ.get('TEST_PASSWORD')

class UserTests(unittest.TestCase):

    def setUp(self):
        self.test_user = {
            'username': TEST_USERNAME,
            'password': TEST_PASSWORD
        }
    
    def tearDown(self):
        pass
    
    @unittest.skip("Skip until delete user is working.")
    def test_create_user(self):
        url = f'{SERVER_URL}/user'
        response = requests.post(url, json=self.test_user)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['username'], 
            self.test_user['username'])
        
    def test_get_known_user(self):
        url = f'{SERVER_URL}/user/{TEST_USERNAME}'
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, TEST_USERNAME)

    def test_get_unknown_user(self):
        url = f'{SERVER_URL}/user/{TEST_USERNAME * 5}'
        response = requests.get(url)
        self.assertEqual(response.status_code, 404)

    # def test_login_returns_token(self):
    #     response = requests.post(self.login_url, json=self.login_data)
    #     self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()