

function prettyNumber(pBytes, pUnits) {
    if(pBytes == 0) return '0 Bytes';
    if(pBytes == 1) return '1 Byte';
    if(pBytes == -1) return '-1 Byte';

    var bytes = Math.abs(pBytes)
    if(pUnits && pUnits.toLowerCase() && pUnits.toLowerCase() == 'si') {
        // SI units use the Metric representation based on 10^3 as a order of magnitude
        var orderOfMagnitude = Math.pow(10, 3);
        var abbreviations = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    } else {
        // IEC units use 2^10 as an order of magnitude
        var orderOfMagnitude = Math.pow(2, 10);
        var abbreviations = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    }
    var i = Math.floor(Math.log(bytes) / Math.log(orderOfMagnitude));
    var result = (bytes / Math.pow(orderOfMagnitude, i));

    // This will get the sign right
    if(pBytes < 0) {
        result *= -1;
    }

    if(result >= 99.995 || i==0) {
        return result.toFixed(0) + ' ' + abbreviations[i];
    } else {
        return result.toFixed(2) + ' ' + abbreviations[i];
    }
}

function formatDateYYYYMMDD(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateYYYYMMDDHHMM(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
		    hours = d.getHours();
				minutes = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') + " " + hours + ":" + minutes;
}

function humanRelativeDate(date) {
	var actual_date = new Date();
	var current_date_timezone_offset = actual_date.getTimezoneOffset();
	var offset = Math.abs(current_date_timezone_offset) * 60;
	var prev_date = new Date(date);
	var delta = Math.floor((actual_date - prev_date) / 1000) + offset;

	if (delta < 0)
	{
		return String(delta);
	}
	if (delta < 60)
	{
		return delta == 1 ? "one second ago" : delta + " seconds ago";
	}
	if (delta < 120)
	{
		return "a minute ago";
	}
	if (delta < 2700) // 45 * 60
	{
		return Math.ceil(delta / 60) + " minutes ago";
	}
	if (delta < 5400) // 90 * 60
	{
		return "an hour ago";
	}
	if (delta < 86400) // 24 * 60 * 60
	{
		return Math.ceil(delta / (60 * 60)) + " hours ago";
	}
	if (delta < 172800) // 48 * 60 * 60
	{
		return "yesterday";
	}
	if (delta < 2592000) // 30 * 24 * 60 * 60
	{
		return Math.ceil(delta / (60 * 60 * 24)) + " days ago";
	}
	if (delta < 31104000) // 12 * 30 * 24 * 60 * 60
	{
		return Math.ceil(delta / (60 * 60 * 24 * 30)) + " month ago (" +
			     prev_date.getUTCDate() + "-" +  (prev_date.getUTCMonth() + 1) + "-" +
					 prev_date.getUTCFullYear() + ")";
	}

	return prev_date.getUTCDate() + "-" +
		     (prev_date.getUTCMonth() + 1) + "-" +
				 prev_date.getUTCFullYear();
}

function humanFormatDateYYYYMMDD(date) {
	return humanRelativeDate(date) + " (" + formatDateYYYYMMDD(date) + ")";
}

function humanFormatDateYYYYMMDDHHMM(date) {
	return humanRelativeDate(date) + " (" + formatDateYYYYMMDDHHMM(date) + ")";
}

Date.prototype.getWeek = function (dowOffset) {

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};
