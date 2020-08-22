function generateCumulativeTimeSummary(filterStartDate, filterEndDate, iCalendarData) {
    var jcalData = ICAL.parse(iCalendarData);
    var comp = new ICAL.Component(jcalData);
    var vevents = comp.getAllSubcomponents('vevent');

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
          if (eventStartDate < filterStartDate) {
            continue;
          }
          if (eventStartDate > filterEndDate) {
            break;
          }

        //   console.log(event);
        //   console.log(summary);
        //   console.log('Duration: ', duration);
        //   console.log(next.toJSDate());

          if (cumulativeDuration.hasOwnProperty(summary)) {
            cumulativeDuration[summary] += duration;
          } else {
            cumulativeDuration[summary] = duration;
          }
        }
      } else {
        if (eventStartDate < filterStartDate) {
          return;
        }
        if (eventStartDate > filterEndDate) {
          return;
        }

        // console.log(event);
        // console.log(summary);
        // console.log('Duration: ', duration);
        // console.log(eventStartDate);

        if (cumulativeDuration.hasOwnProperty(summary)) {
          cumulativeDuration[summary] += duration;
        } else {
          cumulativeDuration[summary] = duration;
        }

        // console.log('');
      }

    //   console.log('---------------------------');
    //   console.log('');
    });

    console.log('Summary: ', cumulativeDuration);
}

if (typeof exports !== 'undefined') {
    exports.generateCumulativeTimeSummary = generateCumulativeTimeSummary;
}
