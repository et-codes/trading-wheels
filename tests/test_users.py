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
        self._test_user = {
            'username': TEST_USERNAME,
            'password': TEST_PASSWORD
        }

        # Create test user if it is not in the database already
        url = f'{SERVER_URL}/user/{TEST_USERNAME}'
        response = requests.get(url)
        if response.text != TEST_USERNAME:
            url = f'{SERVER_URL}/user'
            requests.post(url, json=self._test_user)
    
    def tearDown(self):
        pass
    
    def test_create_and_delete_user(self):
        temp_user = {'username': 'OcroXIMEPLuX', 'password': 'OcroXIMEPLuX'}
        url = f'{SERVER_URL}/user'

        # Create user
        response = requests.post(url, json=temp_user)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['username'], temp_user['username'])

        # Delete user
        response = requests.delete(url, json=temp_user)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, temp_user['username'])
        
    def test_get_known_user(self):
        url = f'{SERVER_URL}/user/{TEST_USERNAME}'
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, TEST_USERNAME)

    def test_get_unknown_user(self):
        url = f'{SERVER_URL}/user/{TEST_USERNAME * 5}'
        response = requests.get(url)
        self.assertEqual(response.status_code, 404)

    def test_login(self):
        url = f'{SERVER_URL}/user/login'
        response = requests.post(url, json=self._test_user)
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.text), 50)

    def test_logout(self):
        url = f'{SERVER_URL}/user/login'
        response = requests.post(url, json=self._test_user)

        url = f'{SERVER_URL}/user/logout/{TEST_USERNAME}'
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, TEST_USERNAME)


if __name__ == '__main__':
    unittest.main()