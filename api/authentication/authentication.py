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
    def __init__(self, auth_db: str):
        self.auth_db = None
        try:
            self.auth_db = sqlite3.connect(auth_db)
        except:
            print("Failed to connect to provided authentication database")

    def __del__(self):
        self.auth_db.close()
     
    def _server_hash(self, name: str) -> str:
        data = self.auth_db.cursor().execute(f"select key,count from lot_sensors where \
                                                name='{name}'").fetchall()
        if data != []:
            key = data[0][0]
            count = str(data[0][1])
            hash_target = key + name + count
            hash_result = sha256(hash_target.encode())
            return hash_result.hexdigest()
        return None
         
    def _client_hash(self, name: str, key: str, count: str) -> str:
        hash_target = key + name + count
        return sha256(hash_target.encode()).hexdigest()        

 
    def authenticate(self, name: str, key: str, count: str) -> bool:
        if self._server_hash(name) == self._client_hash(name, key, count):
            if count == 255:
                count = -1
            self.auth_db.cursor().execute(f"update lot_sensors \
                                            set count={int(count)+1} \
                                            where name='{name}'")
            self.auth_db.commit()
            return True
        return False
