import ICAL from 'ical.js';

export function cumulativeTimeSummary(filterStartDate, filterEndDate, iCalendarData) {
  var jcalData = ICAL.parse(iCalendarData);
  var comp = new ICAL.Component(jcalData);
  var vevents = comp.getAllSubcomponents('vevent');

  let cumulativeDurations = {};

  vevents.forEach((vevent) => {
    var event = new ICAL.Event(vevent);
    var summary = event.summary;
    var eventStartDate = event.startDate.toJSDate();
    let duration = event.duration.toSeconds() / 3600;

    if (event.sequence) {
      var expand = new ICAL.RecurExpansion({
        component: vevent,
        dtstart: vevent.getFirstPropertyValue('dtstart'),
      });

      let i = 0;
      let max = 500;
      let next;
      while ((next = expand.next())) {
        eventStartDate = next.toJSDate();

        if (i++ > max) {
          console.error('too many dates');
          break;
        }
        if (eventStartDate < filterStartDate) {
          continue;
        }
        if (eventStartDate > filterEndDate) {
          break;
        }

        if (cumulativeDurations.hasOwnProperty(summary)) {
          cumulativeDurations[summary] += duration;
        } else {
          cumulativeDurations[summary] = duration;
        }
      }
    } else {
      if (eventStartDate < filterStartDate) {
        return;
      }
      if (eventStartDate > filterEndDate) {
        return;
      }

      if (cumulativeDurations.hasOwnProperty(summary)) {
        cumulativeDurations[summary] += duration;
      } else {
        cumulativeDurations[summary] = duration;
      }
    }
  });

  return cumulativeDurations;
}

export function CSVFromObject(object) {
  let csv = 'Activity, Hours\n';
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      csv += `"${key}", ${object[key].toFixed(2)}\n`;
    }
  }

  return csv;
}
