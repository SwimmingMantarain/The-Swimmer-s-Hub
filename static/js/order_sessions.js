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

async function fetchUsername() {
    try {
        const response = await fetch('/fetch_username', {
            method: 'POST',
        });
        const { username } = await response.json();
        return username
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
window.onload = function () {
    prom = fetchSessions();
    prom.then(async function (obj) {
        let sessions = obj.sessions;
        let today = new Date();
        let current_month = today.getMonth() + 1;
        let current_week = getCurrentWeekNumber();

        for (let i = 0; i < sessions.length; i++) {
            let date = sessions[i].date;
            let [day, month, year] = date.split("-").map(str => Number(str));
            let week = getCurrentWeekNumberFromDate(year, month, day);
            let id = sessions[i].id;

            const username = await fetchUsername();

            let session_html = `
                <li>
                    <div class="session-container" id="${id}" onclick="openModal('${id}')">
                            ${sessions[i].date} @ ${sessions[i].time}
                            <form method="POST" action="/delete_session/${username}/${id}">
                                <button type="submit">Delete</button>
                            </form>
                    </div>
                </li>
            `;

            if (year == today.getFullYear()) {
                if (week == current_week && month == current_month) {
                    document.getElementById("current-week").innerHTML += session_html;
                }
                
                if (month == current_month) {
                    document.getElementById("current-month").innerHTML += session_html;
                } else if (month == current_month - 1) {
                    document.getElementById("last-month").innerHTML += session_html;
                }

                document.getElementById("current-year").innerHTML += session_html;
            } else if (year == today.getFullYear() - 1) {
                document.getElementById("last-year").innerHTML += session_html;
            }

            document.getElementById("all-sessions").innerHTML += session_html;
        }
    });
}

function getCurrentWeekNumberFromDate(year, month, day) {
    const date = new Date(year, month - 1, day);
    const startOfYear = new Date(year, 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return weekNumber;
}

function getCurrentWeekNumber() {
    const date = new Date();
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return weekNumber;
}

