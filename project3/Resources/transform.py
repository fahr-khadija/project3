import sqlite3
import json

def fetch_table_data(cursor, table_name):
    cursor.execute(f"SELECT * FROM {table_name}")
    data = cursor.fetchall()
    return [{desc[0]: value for desc, value in zip(cursor.description, row)} for row in data]

def convert_sqlite_to_json(database_path, json_path):
    # Connect to SQLite database
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

    # Get the list of table names
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [table[0] for table in cursor.fetchall()]

    # Dictionary to store table data
    database_data = {}

    # Fetch data for each table
    for table_name in tables:
        table_data = fetch_table_data(cursor, table_name)
        database_data[table_name] = table_data

    # Close database connection
    conn.close()

    # Write data to a JSON file
    with open(json_path, 'w') as json_file:
        json.dump(database_data, json_file, indent=2)

convert_sqlite_to_json('projectdata.sqlite', 'projectdata.json')
