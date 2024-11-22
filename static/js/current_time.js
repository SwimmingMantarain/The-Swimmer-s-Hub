window.onload = function() {
        var date = new Date();
        var displayDate = date.toLocaleDateString();
        var displayTime = date.toLocaleTimeString();

        var timeNoMeridiem = displayTime.replace(/( AM| PM)$/, '');
        var timeParts = timeNoMeridiem.split(':');
        var hours = Number(timeParts[0]);
        var minutes = timeParts[1];
        if (displayTime.includes('PM')) {
            hours += 12;
        }
        timeNoMeridiem = hours + ':' + minutes;

        document.getElementById('date').value = displayDate;
        document.getElementById('time').value = timeNoMeridiem;
}
