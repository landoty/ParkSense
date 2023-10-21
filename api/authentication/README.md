# Authentication DB
Notes on building the authentication database

## Sensors and API Keys
Each sensor should be assigned an api key. An exmample file, *lot_sensors.json*, is provided. Each key should be configued onto the sensor and used in POST authentication

## Creating the authentication db
A Python script is provided to build the database. Providing the script a json file formatted in the same manner as the example file will produce a [sqlite3](https://docs.python.org/3/library/sqlite3.html) database named *auth.db*.

## Using auth.db in the API
The api currently reads from this directory to load the authentication databse. For testing and eventual deployment, generate *auth.db* and leave it in this directory unless the API is build to read from a different location. 
