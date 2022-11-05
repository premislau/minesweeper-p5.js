# Minesweeper with p5.js
 Minesweeper game created using p5.js library. This project's license is GNU LESSER GENERAL PUBLIC LICENSE Version 2.1.

## Project structure.
### index.html
Contains paths to files used in this project.
### p5.js
Library provided by https://p5js.org. This project folder should be placed in directory containing p5.js file (it can be changed by editing index.html file).
### sketch.js
This file handles project setup, gameborad drawing and user input. In first four lines are specified gameplay settings.
### Board.js
Class Board is specified in this file. It is designed store information about gameboard of wich the most important is matrix of fields. This class provides methods which allow to ineteract whith its content.
### Field.js
Class Field is specified in this file. It is used to store information about each field e. g. if it contains a mine.

## How to run.
p5.js library is necessary to run this game. This project folder should be placed in folder containing p5.js file. The game can be accessed by opening index.html file in a browser.

## Gameplay.
Some of the fields do contain mines, some do not. To win the game player should reveal all fields which do not contain mines. Revealing mine leads to loss. New game can be started by refreshing site.
Player can reveal a field by left-clicking it. If "f" key is down, game is inside mark mode – by left-clicking player can toggle a mark of probable position of mine.
Feedback is provided by graphics: grey field is unrevealed, black field contains a mine, red field is marked, white field does not contain a mine. Number displayed at revealed field, shows how many neighbour (including diagonal) fields contain mines. Some feedback is also provided through console. Game settings are specified at the begining of the sketch.js file.