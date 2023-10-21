# API Guide
A quick notes for using the API

## Endpoints
- /parking-lots
- /parking-lot/\<string:lot\_name\>

## Data Format
```json
    {
        lots: [
            'lot_name' :
            {
                'capacity' : <int: numerical value for maximum capacity of the lot>, 
                'cars': <int: numerical value for current count of cars in the lot>
            },
            ...
        ]
    }
```

## Methods

- GET
    - **/parking-lots** : Retrieve data for all lots
    - **/parking-lot/\<string:lot_name\>,...** : Retrieve data for 1 or more lots, comma delimited

- POST
    - **/parking-lot/\<string:lot_name\>** : Update current data for a single lot
        - {update: \<int: 1/-1 to increment/decrement\>, auth: \<str: hash for authentication\>

## Response Codes 
- **200** : Successful 
- **401** : Unauthenticated 
- **404** : Parking lot(s) not found
 
## Authentication
- Authentication is required for the POST method on ALL requests
- The client is responsible for computing a sha256 digest of it's API key, name, and a nonce count
- The nonce count should start at 0, increment by 1, and return to 0 after reaching 255
- This mechanism is lightweight and ensure confidentiality of the client's API key and protects against replay attacks

### Computing sha256 hash (especially for testing)
- Hash is computed server-side by concatenating the API key, device name, and nonce as a single string
- For example, 'api-key-123device10' would be the to-be-hashed string for device 1's request with api key "api-key-123" and a nonce of 0
- Python provides an implementation in the [hashlib](https://docs.python.org/3/library/hashlib.html) library
- Use OpenSSL on the command line

## Examples using curl

```bash
$ curl http://localhost:5000/parking-lots
$ curl http://localhost:5000/parking-lot/lot1
$ curl -X POST -H "Content-Type: application/json" -d '{"update": 1, "auth": "e9ebea...1e611"}' http://localhost:5000/parking-lot/lot1
```


