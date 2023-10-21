'''
    Name: authenticator.py
    Author: Landen Doty
    Date: 10/20/23
    Description: Class to handle client authentication to the API given the custom
                 API key scheme
                 API/Server will calculate a sha256 digest based on its stored key
                    and nonce count for the given client then,
                 Calculate another sha256 digest using the client's request arguments
                 Client is authenticated if hashes match
    
                 Hashing provides confidentiality and integrity of client's API key
                 Nonce count prevents replay attacks over insecure medium
'''

import sqlite3
from hashlib import sha256


class Authenticator():
    '''
        A class to handle authentication of the client to the API service

        Attr's:
            auth_db : connection to the authentication database (sqlite3)

        Methods:
            _server_hash (private) : calculate the expected hash of the api key, name, and count
            authenticate (public) : return T/F if the credentials are correct
                                    update the nonce count in the db
    '''
    def __init__(self, auth_db: str):
        '''
        @Pre: None
        @Post: instantiate the Authenticator class and connect to the database
        @Side Effects: Open a connection to the local sqlit3 db
        '''
        self.auth_db = auth_db
        try:
            test = sqlite3.connect(auth_db)
            
        except:
            print("Failed to connect to provided authentication database")

    def __del__(self):
        '''
        @Pre: Existing Authenticator class
        @Post: Close the database connection before deallocating object
        @Side Effects: Databse connection terminated
        '''
        self.auth_db.close()
     
    def _server_hash(self, name: str, sqlite_conn) -> str:
        '''
        @Pre: Client provided name to API
        @Post: Return hash if name is in the database, return None if not
        @Side Effects: Query database
        '''
        data = sqlite_conn.cursor().execute(f"select key,count from lot_sensors where \
                                                name='{name}'").fetchall()
        if data != []:
            key = data[0][0]
            count = str(data[0][1])
            hash_target = key + name + count
            hash_result = sha256(hash_target.encode())
            return hash_result.hexdigest(), int(count)
        return None
         
    def authenticate(self, name: str, client_hash: str) -> bool:
        '''
        @Pre: Client provided name, key, count to API and input was sanitized
        @Post: Return True if hashes match, False if not
        @Side Effects: Count incremented by 1 in the databse if hashes match
                       Account for freshness (prevents replay attacks)
        '''
        conn = sqlite3.connect(self.auth_db)
        server_hash, count = self._server_hash(name, conn)
        if server_hash == client_hash:
            if count == 255:
                count = -1
            conn.cursor().execute(f"update lot_sensors \
                                            set count={int(count)+1} \
                                            where name='{name}'")
            conn.commit()
            return True
        return False
