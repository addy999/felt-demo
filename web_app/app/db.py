import sqlite3
import time
import os 
import json

from typing import List

script_directory = os.path.dirname(os.path.abspath(__file__))
DATABASE = script_directory + "/../../fabric.db" 
KEYS = ["id", "material", "length", "width", "quantity"]

def reset_db () -> None:
    
    if os.path.isfile(DATABASE): os.remove(DATABASE)
    
    conn = sqlite3.connect(DATABASE)
    curr = conn.cursor()
    curr.execute("CREATE TABLE Fabric (id varchar(5) PRIMARY KEY, material varchar, length float, width float, quantity int)")
    conn.commit()
    conn.close()

def overwrite_db (data : List[dict]) -> None:
    
    print("Writing db")

    reset_db()
    
    conn = sqlite3.connect(DATABASE)
    curr = conn.cursor()
    
    for row in data:
        curr.execute("INSERT INTO Fabric VALUES (?, ?, ?, ?, ?)", tuple(row.values()))     
    
    conn.commit()
    curr.close()
    conn.close()

def build_default_db () -> None:
    
    overwrite_db([
        {"id" : "abcde", "material" : "Cotton", "length" : 25, "width" : 25, "quantity" : 10},
        {"id" : "lantl", "material" : "Cotton", "length" : 50, "width" : 25, "quantity" : 20},
        {"id" : "nglag", "material" : "Nylon", "length" : 25, "width" : 68, "quantity" : 13}
    ])
    
def build_dict_from_db (data : tuple) -> dict:
        
    return dict(zip(KEYS, data))
    
def get_data () -> List[dict]:
     
    conn = sqlite3.connect(DATABASE)
    curr = conn.cursor()
    
    # Load all
    curr.execute("SELECT * FROM Fabric")
    all_data = [build_dict_from_db(data) for data in curr.fetchall()]
    
    curr.close()
    conn.close()
    
    return all_data