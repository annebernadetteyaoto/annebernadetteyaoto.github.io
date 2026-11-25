
const czTime = document.getElementById("cz-time");
const phTime = document.getElementById("ph-time");

const czDate = document.getElementById("cz-date");
const czFullDate = document.getElementById("cz-full-date");
const phFullDate = document.getElementById("ph-full-date");

function updateClocks() {
    const now = new Date();

    const czOptions = {
        timeZone: "Europe/Prague",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    const phOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    czTime.textContent = new Intl.DateTimeFormat(
        "en-GB", czOptions
    ).format(now);

    phTime.textContent = new Intl.DateTimeFormat(
        "en-GB", phOptions
    ).format(now);

    czDate.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Prague",
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(now).toUpperCase();

    czFullDate.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Prague",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(now);

    phFullDate.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Manila",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(now);
}

updateClocks();
setInterval(updateClocks, 1000);
