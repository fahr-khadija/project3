from flask import Flask, jsonify, render_template
from flask_cors import CORS
import json

# Load the modified JSON data
with open('projectdata_modified.json', 'r') as json_file:
    endpoint_data = json.load(json_file)

# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():

#List all available api routes
    return (
        f"Available Routes:<br/>"
        f"All Data: /api/v1.0/all_data<br/>"
    )

#Return the results of the precipitation analysis
@app.route("/api/v1.0/all_data")
def all_data():

    climate_data = pd.read_sql_table('climate', engine)
    climate_data.set_index("country", inplace=True)
    
#return json data   
    return jsonify(climate_data.to_dict(orient='index'))

#close session
session.close()

if __name__ == '__main__':
    app.run(debug=True)
