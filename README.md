# calendar-event-duration-accumulator
Parses iCal calendar file to summarize how much time is spent at each task. Any events with the same name will have their durations added together. Currently the output is an object in the console with the keys being the name of the events and the values being the total time of all events with that name.

Handles single and recurring events.

Uses index.html for web based interface.

Uses Node and mocha for testing. To run tests, run:
````
cd test
npm install
npm test
````
