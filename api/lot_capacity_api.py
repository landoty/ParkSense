'''
    Name: lot_capacity_api.py
    Author: Landen Doty
    Date: 10/04/23
    Description: Serve API for parking lot capacity
                 Microcontroller will use POST methods to update lot capacities
                 Web app will use GET methods to display results to users
'''
from flask import Flask, request
from flask_restful import Resource, Api, reqparse

# Init the app and api objects
app = Flask(__name__)
api = Api(app)

# Init parking lot capacities
# TODO : In production, this should be read from an auxillery file
parking_lots = {
        'lot1': {'capacity': 100, 'cars': 0},
        'lot2': {'capacity': 150, 'cars': 0},
        'lot3': {'capacity': 200, 'cars': 0}
}

# flask has a really nice built-in class for parsing requests
# also handles a lot of the security concerns with RCE, RCI, LFI, etc.
parser = reqparse.RequestParser()
parser.add_argument('update', type=int, help='Update current car count')

# Single parking lot object
class ParkingLot(Resource):
    def get(self, lot_name):
        if lot_name in parking_lots:
            return parking_lots[lot_name], 200
        return {'message': 'Parking lot not found'}, 404

    def post(self, lot_name):
        args = parser.parse_args()
        update = args['update']

        if update > 0:
            update = 1
        elif update < 0:
            update = -1

        if lot_name in parking_lots:
            parking_lots[lot_name]['cars'] += update
            return {'message': 'Current capacity update successfully'}, 200
        return {'message': 'Parking lots not found'}, 404

class ParkingLots(Resource):
    def get(self):
        return parking_lots, 200





api.add_resource(ParkingLots, '/parking-lots')
api.add_resource(ParkingLot, '/parking-lot/<string:lot_name>')

if __name__ == "__main__":
    app.run(debug=True)
