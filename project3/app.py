from flask import Flask, jsonify, render_template
from flask_cors import CORS
import json

# Load the modified JSON data
with open('projectdata_modified.json', 'r') as json_file:
    endpoint_data = json.load(json_file)

# Flask Setup
app = Flask(__name__)
CORS(app)

# Flask Routes
@app.route("/")
def homepage():
    return render_template("index2.html")

if __name__ == '__main__':
    app.run(debug=True)
