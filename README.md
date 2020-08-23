# calendar-event-duration-accumulator
Parses iCal calendar and generates a CSV file with the total durations from all events with identical names (uses the iCal "summary" field).

Handles single and recurring events.

## Example conversion:
If you have a calendar that looks like this:

![visual calendar](https://github.com/jeffslofish/calendar-event-duration-accumulator/blob/master/calendar-visual.png?raw=true)

You can transform it into this:

![calendar csv summary](https://github.com/jeffslofish/calendar-event-duration-accumulator/blob/master/calendar-summary-csv.png?raw=true)

Which if you import into Excel, will look like this:

![calendar excel summary](https://github.com/jeffslofish/calendar-event-duration-accumulator/blob/master/calendar-summary-excel.png?raw=true)

## How to use:
1. Export your calendar into iCal format (may be .ics extension).
1. Goto https://calendar-event-durations.herokuapp.com/.
1. Choose your desired start and end dates to filter events.
1. Click `Choose File` and select your exported calendar file.
1. You will then be promted to download the CSV summary file.
1. Import the CSV file into Excel or Google Sheets if desired

## To run unit tests:
````
cd test
npm install
npm test
````
