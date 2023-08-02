# footballDraft
This is the code for a multiplayer game hosted on a single computer.
Front is in Vue JS
Back is in NodeJS

Purpose :
Four players compete to get the best possible teams. Everyone gets a random club about a football player. If noone guesses the footballer then no one can have it on his team.
But if a player gets the right lastname (there is a tolerance with uppercases and accents) the player joins automatically his team and is placed in one of his composition.
An algorithm determinates in what composition the player will be placed in order for the first composition to be the best possible team and so on.
The general rankings depends on the best compositions from different players.

Data are stocked in Mysql database within different tables :
- Career, Club, Position and FootballPlayer are the tables from which footballplayer objects and clues to find them are drawned.
- User, UserSession, GameSession, FootballPlayerSession are the tables containing the data for the on going game. It allows player to continue the party later on.

  
