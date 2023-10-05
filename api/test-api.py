'''
    Name: test-api.pi
    Author: Landen Doty
    Date: 10/04/23
    Description: test the current state of the lot capacity api
'''



import unittest
import requests
import json
from lot_capacity_api import app  # Replace 'your_app' with the actual name of your Flask app

class TestParkingLotAPI(unittest.TestCase):
        def setUp(self):
            self.app = app.test_client()
            self.base_url = 'http://localhost:5000'  # Update with your app's URL

        def test_get_single_lot(self):
            response = self.app.get('/parking-lot/lot1')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.get_data(as_text=True))
            self.assertEqual(data['cars'], 0)

        def test_update_lot_capacity(self):
            update_value = {'update': 10}
            response = self.app.post('/parking-lot/lot1', data=json.dumps(update_value), content_type='application/json')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.get_data(as_text=True))
            self.assertEqual(data['message'], 'Current capacity updated successfully')

        def test_get_parking_lots(self):
            response = self.app.get('/parking-lots')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.get_data(as_text=True))
            self.assertTrue('lot1' in data)
            self.assertTrue('lot2' in data)
            self.assertTrue('lot3' in data)

        def test_get_subset_parking_lots(self):
            response = self.app.get('/parking-lots?lot_names=lot1,lot2')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.get_data(as_text=True))
            self.assertTrue('lot1' in data)
            self.assertTrue('lot2' in data)
            self.assertFalse('lot3' in data)

if __name__ == '__main__':
    unittest.main()

