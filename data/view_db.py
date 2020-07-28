import sqlite3 as sql
from pprint import pprint

if __name__ == "__main__":
    conn=sql.connect("fabric.db")
    curr=conn.cursor()
    curr.execute("SELECT * FROM Fabric")
    pprint(curr.fetchall())