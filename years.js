(function() {

$(document).ready(function() {
  var daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  if ( a ) {
    console.log(true);
  }
  else {
    console.log(false);
  }
});


/* A leap year happens if:
 * The year is divisible by 4
 * If the year can be evenly divided by 100, it is NOT a leap year, unless;
 * The year can be evenly divided by 400 and 100
 * 
 * return bool
 */
function checkLeapYear(year) {
  if (year % 4 > 0) {
    return true;
  }
  else if (year % 400 > 0) {
    return year % 100 > 0 ? true : false;
  }
  else {
    return false;
  }
}

})();