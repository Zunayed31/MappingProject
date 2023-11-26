import g4f

from g4f.Provider import (
    AItianhu,
    Aichat,
    Bard,
    Bing,
    ChatBase,
    ChatgptAi,
    OpenaiChat,
    Vercel,
    You,
    Yqcloud,
)

# Set with provider
response = g4f.ChatCompletion.create(
    model="gpt-3.5-turbo",
    provider=g4f.Provider.Bing,
    messages=[{"role": "user", "content": "Find the shortest path available with the best of your knowledge from Kilburn Building, Manchester to Picadilly Station, Manchester assuming you were travelling by car with waypoints on every turn along the way and with latitude and longitude for each of the waypoints.  Format the answer for each point like this: 'waypoint > (latitude,longitude)'. Please use latitude and longitude values that can be used in google maps."}],
    stream=True,
)


with open('example.txt', 'w') as file:
    # Write text to the file.
    for message in response:
        print(message)
        file.write(message)
