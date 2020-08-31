//const { CSVFromObject } = require("./generate");

const uploadFileInput = document.getElementById('upload');
uploadFileInput.addEventListener('change', readFileAsString);

let files;
function readFileAsString() {
  files = this.files;
}

function convert() {
  if (files.length === 0) {
    console.log('No file is selected');
    return false;
  }

  var reader = new FileReader();
  reader.onload = function (event) {
    var iCalendarData = event.target.result;

    var chosenStartDateParts = document
      .getElementById('startDate')
      .value.split('-');
    var chosenStartDate = new Date(
      chosenStartDateParts[0],
      chosenStartDateParts[1] - 1,
      chosenStartDateParts[2]
    );
    var chosenEndDateParts = document
      .getElementById('endDate')
      .value.split('-');
    var chosenEndDate = new Date(
      chosenEndDateParts[0],
      chosenEndDateParts[1] - 1,
      chosenEndDateParts[2],
      23,
      59,
      59
    );

    console.log('Chosen start date: ', chosenStartDate);
    console.log('Chosen end date: ', chosenEndDate);

    let cumulativeDurations = {};
    const groupBy = document.getElementById('groupby').value;
    if (groupBy === 'month') {
      const dates = getStartAndEndDatesForEachMonth(chosenStartDate, chosenEndDate);
      let cumulativeDurationsArr = [];
      for (const [start, end] of dates) {
        //console.log("dates: ", start, end);
        cumulativeDurationsArr.push([cumulativeTimeSummary(
          start,
          end,
          iCalendarData
        ), start.getFullYear(), start.getMonth()]);
      }

      CSVFromObjectArray(cumulativeDurationsArr);


    } else {
      cumulativeDurations = cumulativeTimeSummary(
        chosenStartDate,
        chosenEndDate,
        iCalendarData
      );

      CSVFromObject(cumulativeDurations);
    }
  };
  reader.readAsText(files[0]);
  return false;
}

function getStartAndEndDatesForEachMonth(filterStartDate, filterEndDate) {
  let currentMonth = filterStartDate.getMonth();
  let currentYear = filterStartDate.getFullYear();
  let endMonth = filterEndDate.getMonth();
  let endYear = filterEndDate.getFullYear();

  let dates = [];
  while ((currentMonth < 12 && currentYear < endYear) || (currentMonth <= endMonth && currentYear === endYear)) {
    dates.push(getFirstLastDaysOfMonth(new Date(currentYear, currentMonth, 1)));

    if (currentMonth < 11) {
      currentMonth++;
    } else {
      currentMonth = 0; 
      currentYear++;
    }
  }

  return dates;
}

function pad(num) {
  return ('00' + num).slice(-2);
}

function convertDateToyyyyMMdd(date) {
  const [month, day, year] = date.toLocaleDateString().split('/');
  return `${year}-${pad(month)}-${pad(day)}`;
}

function getFirstLastDaysOfMonth(date) {
  const y = date.getFullYear(),
    m = date.getMonth();
  const firstDayOfMonth = new Date(y, m, 1);
  const lastDayOfMonth = new Date(y, m + 1, 0);

  return [firstDayOfMonth, lastDayOfMonth];
}

function filterCurrentMonth() {
  const [firstDayOfMonth, lastDayOfMonth] = getFirstLastDaysOfMonth(new Date());

  document.getElementById('startDate').value = convertDateToyyyyMMdd(
    firstDayOfMonth
  );
  document.getElementById('endDate').value = convertDateToyyyyMMdd(
    lastDayOfMonth
  );
}

function filterCurrentYear() {
  const date = new Date(),
    y = date.getFullYear();
  const firstDayOfYear = new Date(y, 0, 1);
  const lastDayOfYear = new Date(y, 11, 31);

  document.getElementById('startDate').value = convertDateToyyyyMMdd(
    firstDayOfYear
  );
  document.getElementById('endDate').value = convertDateToyyyyMMdd(
    lastDayOfYear
  );
}

function init() {
  document.getElementById('form').onsubmit = convert;
  document.getElementById('filterCurrentMonth').onclick = filterCurrentMonth;
  document.getElementById('filterCurrentYear').onclick = filterCurrentYear;
}

window.onload = init;
