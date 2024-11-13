async function fetchSessions() {
    try {
        const response = await fetch('/fetch_sessions', {
            method: 'POST',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function for editing the html content of the 3 divs
// so that each of the training sessions can be ordered
// as this week's, this month's and all training sessions
window.onload = function() {
    prom = fetchSessions();
    prom.then(function(obj) {
        // Define sessions variable and get the current month and week numbers
        let sessions = obj.sessions;
        let today = new Date();
        let current_month = today.getMonth() + 1;
        let current_week = getCurrentWeekNumber();

        for (let i = 0; i < sessions.length; i++) {
            let date = sessions[i].date;
            let month = date.split("-")[1];
            //let week = getCurrentWeekNumber(date);
            console.log(i, date, month);
    }
    });
}

function getCurrentWeekNumber() {
    const date = new Date();
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return weekNumber;
}

