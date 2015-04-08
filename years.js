(function() {

  var daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

$(document).ready(function() {

  var bound1 = new Date(1900, 0, 1);  // yyy-mm-dd, month is 0 based 0 = jan
  var bound2 = new Date(2015, 11, 8)

  if ( checkLeapYear( 1901 ) ) {
    console.log(true);
  }
  else {
    console.log(false);
  }
  console.log(1901 % 4);

  checkSundays( bound1, bound2 );
  
});

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


/* If leap year and first day of the month on sunday, 
If first of the month is sat, then 5 sundays in month for 30 day month

If month has 31, then 5 sundays in month if first of month is fri

If first of the month is sun, then 5 sundays in month unless feb
  unless leap year
    where there are 5
    

    */

