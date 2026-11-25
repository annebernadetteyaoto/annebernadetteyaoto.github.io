
const calendar = document.getElementById("calendar");
const monthLabel = document.getElementById("calendar-month");
const yearLabel = document.getElementById("calendar-year");
const todayLabel = document.getElementById("today-date");

function renderCalendar() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    monthLabel.textContent = new Intl.DateTimeFormat("en-GB", {
        month: "long"
    }).format(now).toUpperCase();

    yearLabel.textContent = year;
    todayLabel.textContent = `${today} ${monthLabel.textContent.slice(0, 3)}`;

    // First weekday of the month (Monday = 0)
    const firstDay = new Date(year, month, 1).getDay();
    const offset = (firstDay + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();

    // Clear old calendar dates, preserving weekday headings
    calendar.querySelectorAll(".calendar-day").forEach(day => day.remove());

    // Generate a consistent six-row calendar
    for (let i = 0; i < 42; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");

        let dayNumber;
        let isCurrentMonth = true;

        if (i < offset) {
            dayNumber = previousMonthDays - offset + i + 1;
            isCurrentMonth = false;
        } else if (i >= offset + daysInMonth) {
            dayNumber = i - offset - daysInMonth + 1;
            isCurrentMonth = false;
        } else {
            dayNumber = i - offset + 1;
        }

        dayElement.textContent = dayNumber;

        if (!isCurrentMonth) {
            dayElement.classList.add("outside-month");
        }

        if (isCurrentMonth && dayNumber === today) {
            dayElement.classList.add("today");
        }

        calendar.appendChild(dayElement);
    }
}

renderCalendar();

// Refresh automatically at midnight
setInterval(renderCalendar, 60000);
