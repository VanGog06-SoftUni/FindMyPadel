Lets build the find games page and functionality. I want that page to list all available upcoming games, sorted by day and hour. For design of each game, lets use the cards that represent the upcoming games section on the home page. I want each card to have the following information:

- titile -> keep same format and styling, just increment the number after game
- status -> keep same format and styling, there should be two different statuses - open in primary color (same as now) and full in red color (when a total of 4 players have joined)
- location -> same style as placeholder location that we have right now, just update the text to say: "Padel court #1", there is still no support for different courts
- date -> same format and style, just update it with the reservation date
- duration -> add the start and end times
- players count -> show the number of already signed players, same styling and format
- signed players -> show the already signed players, there should be four rows available for that information, if not full yet -> show empty rows without names
- join button -> button in primary color, it will be used for players to join a certain game, no join functionality is needed for now, just a button without a click handler
