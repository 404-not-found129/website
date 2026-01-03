import json
from unittest import TestCase
from handler import calc

class Test(TestCase):
    def test_calc_addition(self):
        event = {
            'body': json.dumps([10, 5, -3])
        }
        context = {}
        response = calc(event, context)
        self.assertEqual(response['statusCode'], 200)
        body = json.loads(response['body'])
        self.assertEqual(body['result'], 12)

    def test_calc_empty_list(self):
        event = {
            'body': json.dumps([])
        }
        context = {}
        response = calc(event, context)
        self.assertEqual(response['statusCode'], 200)
        body = json.loads(response['body'])
        self.assertEqual(body['result'], 0)

    def test_calc_invalid_json(self):
        event = {
            'body': 'invalid json'
        }
        context = {}
        response = calc(event, context)
        self.assertEqual(response['statusCode'], 400)

    def test_calc_missing_body(self):
        event = {}
        context = {}
        response = calc(event, context)
        self.assertEqual(response['statusCode'], 400)
