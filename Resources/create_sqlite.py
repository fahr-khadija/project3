#!/usr/bin/env python3

import sqlite3
import pandas as pd

from pathlib import Path

database_path = "../Resources/projectdata.sqlite"
Path(database_path).touch()

conn = sqlite3.connect(database_path)
c = conn.cursor()

c.execute('''CREATE TABLE projectdata ( 
          id int, 
          country decimal,
          average_temp decimal,
          renewable_energy_share_percentage decimal,
          electricity_from_fossil_fuels_tWh decimal,
          electricity_from_nuclear_tWh decimal,
          electricity_from_renewables_tWh decimal,
          low_carbon_electricity_percentage decimal,
          primary_energy_consumption_kWh_per_person decimal,
          co2_emissions_metric_tons_per_capita decimal,
          gdp_per_capita decimal,
          land_area_km2 decimal,
          latitude decimal,
          longitude decimal,
          population decimal,
          renewable_energy_consumption_kWh_per_person
          )''')

csv_projectdata = pd.read_csv("../Resources/projectdata.csv")
csv_projectdata.to_sql("projectdata", conn, if_exists='append', index=False)

conn.close()
