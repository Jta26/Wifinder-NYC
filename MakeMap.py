import folium
import pandas
import json
import math
import sys
from urllib.request import urlopen
url = "https://data.cityofnewyork.us/api/views/varh-9tsp/rows.json"
data = urlopen(url)
output = json.loads(data.read())
#Initialize the Map
loc = [40.758505, -73.985624]
m = folium.Map(location=loc, tiles="OpenStreetMap", zoom_start=17)
df = pandas.DataFrame(columns=['lon', 'lat', 'name', 'details'])
for i in range(0, len(output['data'])):
    df.loc[i] = [
        output['data'][i][16],
        output['data'][i][15],
        output['data'][i][22],
        output['data'][i][20]
    ]

def distForm(lat1, lon1, lat2, lon2):
    distance = math.sqrt(math.pow(lat2 - lat1, 2) + math.pow(lon2 - lon1, 2))
    return distance

def DetermineDistance(lat, lon, points):
    for i in range(0, len(df)):
        df_lat = float(df.iloc[i]['lat'])
        df_lon = float(df.iloc[i]['lon'])
        df_name = df.iloc[i]['name']
        df_details = df.iloc[i]['details']
        distance = distForm(lat, lon, df_lat, df_lon)
        if (len(points) == 0):
            points = [[df_lat, df_lon, distance, df_name, df_details]]
            continue
        points.append([df_lat, df_lon, distance, df_name, df_details])
    points.sort(key=lambda elem: elem[2])
    return points[:20]

def MakeMap(points):
    for i in range(0, len(points)):
        lon = points[i][1]
        lat = points[i][0]
        name = points[i][3]
        details = str(points[i][4])
        html = "<p>SSID:  " + name + "</p>" + "<p>Details:" + details + "</p>"
        folium.Marker([lat, lon], popup=html).add_to(m)
        m.save('map.html')
