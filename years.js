(function() {

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

$(document).ready(function() {

  // Validate the form
  $('#sundaysInputForm').validate({
    debug: true,
    rules: {
      "from-month": {
        required: true,
        maxlength: 2,
        number: true
      },
      "from-day": {
        required: true,
        maxlength: 2,
        number: true
      },
      "from-year": {
        required: true,
        maxlength: 4,
        number: true
      },
      "to-month": {
        required: true,
        maxlength: 2,
        number: true
      },
      "to-day": {
        required: true,
        maxlength: 2,
        number: true
      },
      "to-year": {
        required: true,
        maxlength: 4,
        number: true
      }
    },
    submitHandler: function(form) {
      var bound1 = formatDate( $('#from-month').val(), $('#from-day').val(), $('#from-year').val() );
      var bound2 = formatDate( $('#to-month').val(), $('#to-day').val(), $('#to-year').val() );
      
      $('#total').text( checkSundays( bound1, bound2 ) );
      $('#date1').text( dayNames[bound1.getDay()] + ', ' + monthNames[bound1.getMonth()] + ' ' + bound1.getDate() + ' ' + bound1.getFullYear());
      $('#date2').text( dayNames[bound2.getDay()] + ', ' + monthNames[bound2.getMonth()] + ' ' + bound2.getDate() + ' ' + bound2.getFullYear());
    }
  });
});




/* Converts string to int, if applicable
 * 
 * params m, d, y
 * returns date
 */
function formatDate(m, d, y) {
  m = parseInt(m);
  d = parseInt(d);
  y = parseInt(y);

  return new Date( y, m, d );
}




/* Count how many Sundays appear in a year on a certain dayform a lower month bound to an upper month bound
 * 
 * params year, dateFromMonth, dateToMonth, day
 * returns int
 */
function checkSundays(bound1, bound2) {
  var yearDiff = getYearDiff(bound1.getFullYear(), bound2.getFullYear());
  var sundays = 0;

  //If we're checking only 1 year, no reason to do the year loop
  if (yearDiff > 0) {
    
    // Increment the year
    for( var year=bound1.getFullYear(); year <= bound2.getFullYear(); year++ ) {

      /* Check if year is the first year of the bounds or the last year
       * The boundary years may have different bounds for the month and date
       */
      if ( year == bound1.getFullYear() || year == bound2.getFullYear() ) {
        sundays += getSundayCountByMonth(year, bound1.getMonth(), bound2.getMonth(), 1);
      }
      else {
        sundays += getSundayCountByMonth(year, 0, 11, 1);
      }
    }
  }
  else {
    sundays += getSundayCountByMonth(bound1.getFullYear(), bound1.getMonth(), bound2.getMonth(), 1);
  }

  return sundays;
}




/* Count how many Sundays appear in a year on a certain day from a lower month bound to an upper month bound
 * 
 * params year, dateFromMonth, dateToMonth, day
 * returns int
 */
function getSundayCountByMonth(year, dateFromMonth, dateToMonth, day) {
  var count = 0;

  for (var month=dateFromMonth; month<=dateToMonth; month++) {
    if ( new Date( year, month, day ).getDay() == 0 ) {
      count++;
    }
  }

  return count;
}




/* Gets difference in years between two year inputs
 * 
 * params lowYearBound, upperYearBound
 * returns int
 */
function getYearDiff(lowYearBound, upperYearBound) {
  return Math.abs(upperYearBound - lowYearBound);
}




/* A leap year happens if:
 * The year is divisible by 4
 * If the year can be evenly divided by 100, it is NOT a leap year, unless;
 * The year can be evenly divided by 400 and 100
 * 
 * params year
 * return bool
 */
function checkLeapYear(year) {
  if (year % 4 > 0) {
    return false;
  }
  else if (year % 400 > 0) {
    return year % 100 > 0 ? true : false;
  }
  else {
    return false;
  }
}

})();