import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key="AIzaSyCFVgsTwnqPuuoLSbDQt2gonZqaQHShN-E")

# start = input("Starting place \n")
# end = input("Destination \n")

distance = gmaps.directions("Kilburn Building","Picadilly station, manchester")

KmDistance = (distance[0]['legs'][0]['distance']['text'])
HrsMinsDuration = (distance[0]['legs'][0]['duration']['text'])

print(KmDistance, " + ", HrsMinsDuration)
print(distance)


# test = gmaps.geocode('Kilburn Building, Manchester')
# lat = (test[])
print()