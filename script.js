function readFileAsString() {
  var files = this.files;
  if (files.length === 0) {
    console.log('No file is selected');
    return;
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

    let cumulativeDurations = cumulativeTimeSummary(
      chosenStartDate,
      chosenEndDate,
      iCalendarData
    );
    console.log(cumulativeDurations);

    CSVFromObject(cumulativeDurations);
  };
  reader.readAsText(files[0]);
}

document.getElementById('upload').addEventListener('change', readFileAsString);
