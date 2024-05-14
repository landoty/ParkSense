'''
    Name: lot_capacity_api.py
    Authors: Landen Doty, Troy D'Amico
    Date: 10/04/23
    Description: Serve API for parking lot capacity
                 Microcontroller will use POST methods to update lot capacities
                 Web app will use GET methods to display results to users
'''
from flask import Flask, request, make_response
from flask_restful import Resource, Api, reqparse
import json
import hashlib

# Init the app and api objects
app = Flask(__name__)
api = Api(app)

# Init parking lot capacities
lot_file = open("./parking_lots.json")
parking_lots = json.load(lot_file)

# Init busy times
busy_times_file = open("./avg_busy_times.json")
busy_times = json.load(busy_times_file)

# flask has a really nice built-in class for parsing requests
# also handles a lot of the security concerns with RCE, RCI, LFI, etc.
parser = reqparse.RequestParser()
parser.add_argument('update', type=int, help='Update current car count')
parser.add_argument('auth', type=str, help='Authentication hash')

password_hash = "f88139faa2df0a13041cd19158237f691327d26ec075b073298357c42822c434"

# Authentication function compares usernames and checks password hash
def authenticate():
    if (request.authorization):
        password_in = request.authorization.password
        hash_in = hashlib.sha256(password_in.encode("utf-8")).hexdigest() #hash incoming password
        return (
                    request.authorization.username == "ParkSense_Admin" and 
                    hash_in == password_hash
                )
    return False

# Single parking lot object
class ParkingLot(Resource):
    '''
    @Pre: parking lot data loaded, some capacity and current capacity
    @Post: If requesting an existing lot, return current capacity and 200
           Else return message and 400
    @Side Effects: None
    '''
    def get(self, lot_name):
        if authenticate():
            # check if requested lot in known lots
            if lot_name in parking_lots:
                # return current capacity of lot
                return parking_lots[lot_name], 200
            # default return error 404
            return {'message': 'Parking lot not found'}, 404
        return make_response("Authentication failed!", 401, {"WWW-Authenticate" : "Basic realm='Login Required'"})

    '''
    @Pre: Parking lot data loaded, some capacity and current capacity
    @Post: If requested lot exists, increment or decrement capacity as requested
           If update parameter is negative, decrement by 1
           If update parameter is positive, increment by 1
           This protects against a single request clearing out or filling a lot's current capacity
    @side Effects: a single lot's capacity may increase or decrease by 1 per request
    '''
    def post(self, lot_name):
        if authenticate():
            # Parse parameter
            args = parser.parse_args()
            if not(hasattr(args, 'update')): #and hasattr(args,'auth')):
                return {'message': 'Insufficient arguments'}, 404

            update = args['update']
            #auth_hash = args['auth']
            
            #if not auth.authenticate(lot_name, auth_hash):
            #    return {'message': 'Device authentication failed'}, 401

            # normalize update value to 1 or -1
            if update > 0:
                update = 1
            elif update < 0:
                update = -1

            # check if requested lot is known
            if lot_name in parking_lots:
                # protect against negative lot current capacity
                if (update == -1 and parking_lots[lot_name]['cars'] > 0) or update == 1:
                    parking_lots[lot_name]['cars'] += update
                return {'message': 'Current capacity updated successfully'}, 200
            # default return
            return {'message': 'Parking lots not found'}, 404
        return make_response("Authentication failed!", 401, {"WWW-Authenticate" : "Basic realm='Login Required'"})

class ParkingLots(Resource):
    '''
    @Pre: parking lot data loaded some capacity and current capacity
    @Post: Return a subset of all of the lots' current capacities
           If a list of lots is specified, return only those
           Else return all
    @Side Effects: None
    '''
    def get(self):
        if authenticate():
            # Check if there are request args
            if len(request.args) > 0:
                # if so, parse those
                subset = {}
                lot_names = request.args.get('lot_names', '').split(',')
                # if the requested lots are in the known lots, add those to the returned capacities
                for lot_name in lot_names:
                    if lot_name in parking_lots:
                        subset[lot_name] = parking_lots[lot_name]
                # return subset
                return subset, 200
            # return all lots by default
            return parking_lots, 200
        return make_response("Authentication failed!", 401, {"WWW-Authenticate" : "Basic realm='Login Required'"})

class ParkingLotNames(Resource):
    def get(self):
        if authenticate():
            return list(parking_lots.keys()), 200
        return make_response("Authentication failed!", 401, {"WWW-Authenticate" : "Basic realm='Login Required'"})

class AvgBusyTimes(Resource):
    def get(self, lot_name):
        if authenticate():
            # check if requested lot in known lots
            if lot_name in busy_times:
                # return current capacity of lot
                return busy_times[lot_name], 200
            # default return error 404
            return {'message': 'Parking lot not found'}, 404
        return make_response("Authentication failed!", 401, {"WWW-Authenticate" : "Basic realm='Login Required'"})
        
api.add_resource(ParkingLots, '/parking-lots')
api.add_resource(ParkingLot, '/parking-lot/<string:lot_name>')
api.add_resource(ParkingLotNames, '/lot-names')
api.add_resource(AvgBusyTimes, '/avg-busy-times/<string:lot_name>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
