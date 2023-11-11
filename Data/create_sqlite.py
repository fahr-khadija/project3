import sqlite3
import pandas as pd

from pathlib import Path

database_path = "../Resources/projectdata.sqlite"
Path(database_path).touch()

conn = sqlite3.connect(database_path)
c = conn.cursor()

c.execute('''CREATE TABLE climate_change ( 
          ID int, 
          Flavors text, 
          Quantities int, 
          Price float
          )''')

csv_icecream = pd.read_csv("../Resources/projectdata.csv")
csv_icecream.to_sql("projectdata", conn, if_exists='append', index=False)

conn.close()
