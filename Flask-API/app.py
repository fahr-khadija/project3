from flask import Flask, jsonify
import requests
import pandas as pd

app = Flask(__name__)

@app.route('/sustainable_energy_data', methods=['GET'])
def get_sustainable_energy_data():
    df = pd.read_csv('path_to_sustainable_energy_dataset.csv')  # Replace with the actual path
    # Perform data cleaning if necessary
    return jsonify(df.to_dict())

@app.route('/country_info_data', methods=['GET'])
def get_country_info_data():
    df = pd.read_csv('path_to_country_info_dataset.csv')  # Replace with the actual path
    # Perform data cleaning if necessary
    return jsonify(df.to_dict())

if __name__ == '__main__':
    app.run(debug=True)