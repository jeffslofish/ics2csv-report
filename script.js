function diff_minutes(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000 / 60;
  return Math.abs(Math.round(diff));
}

document.getElementById('upload').addEventListener('change', readFileAsString);
function readFileAsString() {
  var files = this.files;
  if (files.length === 0) {
    console.log('No file is selected');
    return;
  }

  var reader = new FileReader();
  reader.onload = function (event) {
    var iCalendarData = event.target.result;
    var jcalData = ICAL.parse(iCalendarData);
    var comp = new ICAL.Component(jcalData);
    var vevents = comp.getAllSubcomponents('vevent');

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

    let cumulativeDuration = {};

    vevents.forEach((vevent) => {
      var event = new ICAL.Event(vevent);
      var summary = event.summary;
      var eventStartDate = event.startDate.toJSDate();
      var eventEndDate = event.endDate.toJSDate();
      let duration = event.duration.toSeconds() / 60;

      if (event.sequence) {
        var expand = new ICAL.RecurExpansion({
          component: vevent,
          dtstart: vevent.getFirstPropertyValue('dtstart'),
        });

        let i = 0;
        let max = 500;
        let dates = [];
        let now = new Date();
        let next;
        while ((next = expand.next())) {
          eventStartDate = next.toJSDate();

          if (i++ > max) {
            console.error('too many dates');
            break;
          }
          if (eventStartDate < chosenStartDate) {
            continue;
          }
          if (eventStartDate > chosenEndDate) {
            break;
          }

          console.log(event);
          console.log(summary);
          console.log('Duration: ', duration);
          console.log(next.toJSDate());

          if (cumulativeDuration.hasOwnProperty(summary)) {
            cumulativeDuration[summary] += duration;
          } else {
            cumulativeDuration[summary] = duration;
          }
        }
      } else {
        if (eventStartDate < chosenStartDate) {
          return;
        }
        if (eventStartDate > chosenEndDate) {
          return;
        }

        console.log(event);
        console.log(summary);
        console.log('Duration: ', duration);
        console.log(eventStartDate);

        if (cumulativeDuration.hasOwnProperty(summary)) {
          cumulativeDuration[summary] += duration;
        } else {
          cumulativeDuration[summary] = duration;
        }

        console.log('');
      }

      console.log('---------------------------');
      console.log('');
    });

    console.log('Summary: ', cumulativeDuration);
  };
  reader.readAsText(files[0]);
}
