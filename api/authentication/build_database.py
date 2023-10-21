import os, sys
import sqlite3
import json

DBFILE = "auth.db"

def check_db():
    return os.path.isfile(DBFILE)

def populate_with_lots(file_in):
    f = open(file_in)    
    data = None    
    try:
        data = json.load(f)['lots']
        # existence check
        data[0]['name']
        data[0]['key']
    except:
        print("Improper file format!\nProvide a json file of the format 'lots' : [{'name': 'key'}, ...]")
        return
    con = sqlite3.connect(DBFILE) 
    cur = con.cursor()
    for lot in data:
        print(lot['name'])
        print(lot['key'])
        cur.execute(f"INSERT INTO lot_sensors VALUES ('{lot['name']}', '{lot['key']}', 0)")
        print(cur.execute("SELECT * from lot_sensors").fetchall())
    con.commit()
    con.close()
    
def build_auth_db(lot_file):
    if not check_db():
        con = sqlite3.connect(DBFILE)
        cur = con.cursor()
        cur.execute("CREATE TABLE lot_sensors(name, key, count)")  
        con.commit()
        con.close()              
        populate_with_lots(lot_file) 
        print(f"Authentication database built : {DBFILE}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No file provided to build database!")
    else:
        build_auth_db(sys.argv[1])
