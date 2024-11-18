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
                    <div class="session-container" id="${id}" onclick="openModal('${id}')">
                            ${sessions[i].date} @ ${sessions[i].time}
                            <form method="POST" action="/delete_session/${username}/${id}">
                                <button type="submit">Delete</button>
                            </form>
                    </div>
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

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        bubble.style.animationDuration = `${5 + Math.random() * 5}s`;
        body.appendChild(bubble);
    }
});

// JavaScript to toggle minimize/maximize functionality for fieldsets
document.addEventListener("DOMContentLoaded", () => {
    const fieldsets = document.querySelectorAll(".session-field");

    fieldsets.forEach(fieldset => {
        const legend = fieldset.querySelector("legend");

        // Add click event to the legend
        legend.addEventListener("click", () => {
            const content = Array.from(fieldset.children).filter(child => child !== legend);

            content.forEach(element => {
                if (element.style.display === "none") {
                    element.style.display = "";
                    legend.style.color = "#338ab3"; // Reset to theme color
                    legend.style.backgroundColor = "#001526";
                    legend.style.boxShadow = "0 0 10px rgba(51, 138, 179, 0.5)";
                } else {
                    element.style.display = "none";
                    legend.style.color = "#ff6f61"; // Highlight legend when minimized
                    legend.style.backgroundColor = "#002240";
                    legend.style.boxShadow = "0 0 10px rgba(255, 111, 97, 0.8)";
                }
            });
        });

        // Start with fieldset expanded
        fieldset.style.overflow = "hidden";
    });
});


