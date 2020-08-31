ICAL = require('../vendor/ical.js');
fs = require('fs');
generate = require('../generate.js');
assert = require('assert');

function generateFilterStartDate(date) {
  let chosenStartDateParts = date.split('-');
  return new Date(
    chosenStartDateParts[0],
    chosenStartDateParts[1] - 1,
    chosenStartDateParts[2]
  );
}

function generateFilterEndDate(date) {
  let chosenEndDateParts = date.split('-');
  return new Date(
    chosenEndDateParts[0],
    chosenEndDateParts[1] - 1,
    chosenEndDateParts[2],
    23,
    59,
    59
  );
}

describe('cumulativeTimeSummary()', function () {
  describe('single non-recurring event', function () {
    it('should return object with correct cumulative time when the filter start and end dates are the same as the event date', function (done) {
      fs.readFile('test-000.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-18'),
          generateFilterEndDate('2020-08-18'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test0: 5 });
        done();
      });
    });

    it('should return object with correct cumulative time when the filter is before the event', function (done) {
      fs.readFile('test-000.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-15'),
          generateFilterEndDate('2020-08-17'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, {});
        done();
      });
    });

    it('should return object with correct cumulative time when the filter after before the event', function (done) {
      fs.readFile('test-000.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-19'),
          generateFilterEndDate('2020-08-25'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, {});
        done();
      });
    });

    it('should return object with correct cumulative time when the filter is around the event', function (done) {
      fs.readFile('test-000.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-10'),
          generateFilterEndDate('2020-08-25'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test0: 5 });
        done();
      });
    });
  });

  describe('single recurring event', function () {
    it('should return object with correct cumulative time when the filter start and end dates are the same as the event start and end dates', function (done) {
      fs.readFile('test-001.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-16'),
          generateFilterEndDate('2020-08-19'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test1: 4 });
        done();
      });
    });

    it('should return object with correct cumulative time when the filter start date is before the event start date and the filter end date is the same as the event end date', function (done) {
      fs.readFile('test-001.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-15'),
          generateFilterEndDate('2020-08-19'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test1: 4 });
        done();
      });
    });

    it('should return object with correct cumulative when filtering for first day of recurring event', function (done) {
      fs.readFile('test-001.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-16'),
          generateFilterEndDate('2020-08-16'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test1: 1 });
        done();
      });
    });

    it('should return object with correct cumulative when filtering for last day of recurring event', function (done) {
      fs.readFile('test-001.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-19'),
          generateFilterEndDate('2020-08-19'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test1: 1 });
        done();
      });
    });

    it('should return object with correct cumulative when filtering for middle day of recurring event', function (done) {
      fs.readFile('test-001.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-17'),
          generateFilterEndDate('2020-08-17'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test1: 1 });
        done();
      });
    });

    it('should return empty object when filtering outside event window', function (done) {
      fs.readFile('test-001.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-13'),
          generateFilterEndDate('2020-08-14'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, {});
        done();
      });
    });

    it('should return object with correct cumulative when filtering around entire event', function (done) {
      fs.readFile('test-001.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-13'),
          generateFilterEndDate('2020-08-21'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test1: 4 });
        done();
      });
    });
  });

  describe('multiple non-recurring events with same name', function () {
    it('should return object with correct cumulative when filtering around all the events', function (done) {
      fs.readFile('test-002.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-15'),
          generateFilterEndDate('2020-08-22'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test2: 10 });
        done();
      });
    });

    it('should return object with correct cumulative when filtering the first event', function (done) {
      fs.readFile('test-002.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-15'),
          generateFilterEndDate('2020-08-17'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test2: 2 });
        done();
      });
    });

    it('should return object with correct cumulative when filtering the last event', function (done) {
      fs.readFile('test-002.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-20'),
          generateFilterEndDate('2020-08-22'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test2: 3 });
        done();
      });
    });

    it('should return object with correct cumulative when filtering for middle events', function (done) {
      fs.readFile('test-002.ics', 'utf8', function (err, iCalendarData) {
        if (err) {
          return console.log(err);
        }

        let cumulativeDurations = generate.cumulativeTimeSummary(
          generateFilterStartDate('2020-08-18'),
          generateFilterEndDate('2020-08-19'),
          iCalendarData
        );

        assert.deepEqual(cumulativeDurations, { test2: 5 });
        done();
      });
    });
  });
});
