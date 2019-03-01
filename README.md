# Wifinder-NYC
This Repository hosts a Flask app I wrote that serves a website that finds the 20 closest wifi access points to the specified location. The project makes use of Leaflet.js in order to select coordinates and return points on the map. Each point on the map is clickable and contains the SSID and some details about the hotpot.

## Up and Running
To get this project running locally. You need a Flask, Pandas, as well as Folium.
> pip install Flask
> 
> pip install pandas
>
>pip install folium
 
Then run:
> export FLASK_APP=WifinderNYC<span></span>.py

and then:
>flask run

Navigate to:
> http://<span></span>localhost:5000

## Dependencies
- [Flask](http://flask.pocoo.org/docs/1.0/installation/)
- [Pandas](https://pandas.pydata.org/)
- [urllib4](https://docs.python.org/3/library/urllib.html)
- [Jquery](https://jquery.com/)
- [Leaflet.js](https://leafletjs.com/)
## Dataset
The data for this project is pulled from the NYC public dataset website at:

 https://opendata.cityofnewyork.us/.

The link to the specific dataset is: 

 https://data.cityofnewyork.us/api/views/varh-9tsp/rows.json
 
