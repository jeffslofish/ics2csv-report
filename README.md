# ics2csv_report
Parses ICS calendar file and generates a CSV summary file with the total durations from all events with identical names for the Summary field.

Handles single and recurring events.

## Example conversion:
If you have a calendar that looks like this:

![visual calendar](https://github.com/jeffslofish/calendar-event-duration-accumulator/blob/master/calendar-visual.png?raw=true)

You can transform it into a CSV, which looks like this:

![calendar csv summary](https://github.com/jeffslofish/calendar-event-duration-accumulator/blob/master/calendar-summary-csv.png?raw=true)

Which if you import into Excel, will look like this:

![calendar excel summary](https://github.com/jeffslofish/calendar-event-duration-accumulator/blob/master/calendar-summary-excel.png?raw=true)

## How to use:
1. Export your calendar into ICS format (from your calendar program).
2. Goto https://calendar-event-durations.herokuapp.com/.
3. Choose your desired start and end dates to filter events.
4. Click `Choose File` and select your exported ICS calendar file.
5. You will then be promted to download the CSV summary file.
6. Import the CSV file into Excel or Google Sheets if desired

## Development instructions

### To build from source
````
npm run build
````
You can use /dist-web/ics2csv.js for inclusion in HTML files.
You can use /dist/ics2csv.js for Node projects.

## To run unit tests:
````
npm run test
````
