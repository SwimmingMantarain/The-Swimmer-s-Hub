window.onload = function() {
        var date = new Date();
        var displayDate = date.toLocaleDateString();
        var displayTime = date.toLocaleTimeString();

        var timeNoMeridiem = displayTime.replace(/( AM| PM)$/, '');

        document.getElementById('date').value = displayDate;
        document.getElementById('time').value = timeNoMeridiem;
}
