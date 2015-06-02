# Word Up

[![Join the chat at https://gitter.im/aharris88/word-up](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aharris88/word-up?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status][travis-badge]][travis-page]

[travis-badge]: https://api.travis-ci.org/aharris88/word-up.svg?branch=master
[travis-page]: https://travis-ci.org/aharris88/word-up

It's not quite working yet, but there is a demo to get an idea of how it would work.

## Tests

Run this tests with:

    karma start karma.conf.js

## Todo

### Planned

* Move the letters down a tad
* Style the stats
* Make it responsive
* Add a new game button
* Make the new game button work
* Get it into Cordova
* Show the path of your word
* Sync data to firebase for analytics
* Make a mode that limits you to 5 moves and you just try to get the top score in 5 moves
* Allow the user to put in their name when they beat the top score
* Save the top score to firebase
* Display the actual top score
* Check to see if there no more possible words
* Add Google Analytics
* Add Google AdSense
* Count the number of letters instead of 1 point for 3 and 4 letter words (3 letters should be 3 points, and 4 should be 4, etc)
* Add different points for different letters (Qu and Z should count for more)
* Make it timed
* Increment the number of moves counter even if they didn't choose a real word
* Save incorrect words to firebase for analytics
* Final score should be numberOfWords + letterScore - numberOfMoves
* Add an animation at the end that counts up your final score
* Add a pause button
* When you pause it should cover up the board
* Add a final animation
* Get it in Google Play
* Integrate with Play Games
* Add leaderboard
* Add achievements
* Add admob

### Ideas

* Let the user swap the top 2 rows
* Add some tiles that have extra points
* Wild card tiles
* Scramble button to mix up the board
* Multi-player
* Get it in the App Store
* Integrate with Game Center
