ICAL = require('../vendor/ical.js');
fs = require('fs')
generateCumulativeTimeSummary = require('../generateCumulativeTimeSummary.js');

fs.readFile('test-001.ics', 'utf8', function (err,iCalendarData) {
  if (err) {
    return console.log(err);
  }
  // console.log(iCalendarData);

  var chosenStartDateParts = '2020-08-16'.split('-');
  var chosenStartDate = new Date(
    chosenStartDateParts[0],
    chosenStartDateParts[1] - 1,
    chosenStartDateParts[2]
  );
  var chosenEndDateParts = '2020-08-21'.split('-');
  var chosenEndDate = new Date(
    chosenEndDateParts[0],
    chosenEndDateParts[1] - 1,
    chosenEndDateParts[2],
    23,
    59,
    59
  );
  
  // console.log('Filter start date: ', chosenStartDate);
  // console.log('Filter end date: ', chosenEndDate);
  
  let cumulativeDurations = generateCumulativeTimeSummary.generateCumulativeTimeSummary(chosenStartDate, chosenEndDate, iCalendarData);
  console.log(cumulativeDurations);
  
});







