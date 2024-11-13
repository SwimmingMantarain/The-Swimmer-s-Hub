window.onload = function() {
        var date = new Date();
        var displayDate = date.toLocaleDateString();
        var displayTime = date.toLocaleTimeString();

        document.getElementById('date').value = displayDate;
        document.getElementById('time').value = displayTime;
}