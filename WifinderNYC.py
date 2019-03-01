from flask import Flask, request, jsonify
from flask import render_template
import MakeMap
import json
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/wifinder', methods=['POST'])
def wifind():
    jsonReq = request.get_json( silent=True)
    print(jsonReq)
    lat = float(jsonReq['lat'])
    lon = float(jsonReq['lon'])
    points = MakeMap.DetermineDistance(lat, lon, [])
    

    return jsonify(points)