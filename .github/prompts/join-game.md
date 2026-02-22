Lets implement the join game functionality. A player should be able to join games from the games page. Here are some requirements:

- if the player already joined the game, the join button be replaced with a "Leave" button in red. Don't implement any click handlers on that button for now.
- clicking on the join button should add the player to that game, once added, the join button should be replaced with a leave button and a toast message should be displayed
- before adding a new entry in the database, a check should be done to verify that this person has not already joined that game
- once joined, user's name should appear in the list of joined players in the game card
- once joined, the players count should reflect the new addition
