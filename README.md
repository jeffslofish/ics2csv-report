# calendar-event-duration-accumulator
Parses iCal calendar and generates a CSV file with the total durations from all events with identical names (uses the iCal "summary" field).

Handles single and recurring events.

Uses index.html for web based interface.

Uses Node and Mocha for testing. To run tests, run:
````
cd test
npm install
npm test
````
