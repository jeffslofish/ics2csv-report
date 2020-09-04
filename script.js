const uploadFileInput = document.getElementById('upload');
uploadFileInput.addEventListener('change', readFileAsString);

let files;
function readFileAsString() {
  files = this.files;
}

function convert() {
  if (!files || files.length === 0) {
    alert('No file is selected');
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

    let cumulativeDurations
    try {
      cumulativeDurations = ics2csv.cumulativeTimeSummary(
        chosenStartDate,
        chosenEndDate,
        iCalendarData
      );
    } catch(e) {
      alert(e);
      return false;
    }

    let csv = ics2csv.CSVFromObject(cumulativeDurations);
    download(csv, 'time.csv', 'text/plain');
  };
  reader.readAsText(files[0]);
  return false;
}

function pad(num) {
  return ('00' + num).slice(-2);
}

function convertDateToyyyyMMdd(date) {
  const [month, day, year] = date.toLocaleDateString().split('/');
  return `${year}-${pad(month)}-${pad(day)}`;
}

function filterCurrentMonth() {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDayOfMonth = new Date(y, m, 1);
  const lastDayOfMonth = new Date(y, m + 1, 0);

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
